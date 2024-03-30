import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import { ethers, BigNumber } from 'ethers';
import { keccak256, defaultAbiCoder } from 'ethers/lib/utils';
import { UserOperationBuilder, Presets, Client } from 'userop';
import { Constants } from 'userop';
import { WALLET_FACTORY_ABI, ENTRY_POINT_ABI, ERC721_CONTRACT_ABI, WALLET_ABI } from '../../../blockchain/utils/abi.js';


const ContractInteraction = () => {
  const { user, signer, provider } = useContext(UserContext)
  let { id } = useParams();
  const [contractData, setContractData] = useState({})

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/contract/singleContract/${id}`);
        setContractData(response.data.contract);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchContractData();
  }, [id])

  console.log('CA :', contractData)


  const getSignatures = async (userOpHash: string, paymasterPrivateKey?: string) => {
    let userWallet!: ethers.Wallet;
    let paymaster!: ethers.Wallet;
    let paymasterSign!: string;

    if (paymasterPrivateKey) {
      // paymaster = new ethers.Wallet(paymasterPrivateKey!, initializeProvider('mumbai', env)); // dynamic chain
      // paymasterSign = await paymaster.signMessage(ethers.utils.arrayify(userOpHash));
      // userWallet = new ethers.Wallet(privateKey, initializeProvider('mumbai', env)); // dynamic chain
      // const signature1 = await userWallet.signMessage(ethers.utils.arrayify(userOpHash));
      // return [signature1, paymasterSign];
    } else {
      console.log("pohocha yaha tak?")
      const signature1 = await signer.signMessage(ethers.utils.arrayify(userOpHash));

      return [signature1];
    }
  }

  const getUserOpHash = async (userOp: any, chain: string) => {
    // in future need a condition if it is an eth transfer or else
    console.log('UserOp:', userOp);

    const encodedUserOp = defaultAbiCoder.encode(
      ['address', 'uint256', 'bytes32', 'bytes32', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'bytes32'],
      [
        userOp.sender,
        userOp.nonce,
        keccak256(userOp.initCode),
        keccak256(userOp.callData),
        userOp.callGasLimit,
        userOp.verificationGasLimit,
        userOp.preVerificationGas,
        userOp.maxFeePerGas,
        userOp.maxPriorityFeePerGas,
        keccak256(userOp.paymasterAndData),
      ],
    );
    // Encode the keccak256 hash with the address of the entry point contract and chainID
    const encodedUserOpWithChainIdAndEntryPoint = defaultAbiCoder.encode(
      ['bytes32', 'address', 'uint256'],
      [keccak256(encodedUserOp), Constants.ERC4337.EntryPoint, "80001"], // mumbai chain rn
    );

    return keccak256(encodedUserOpWithChainIdAndEntryPoint);
  }

  async function builderOp(
    walletContract: any,
    nonce: BigNumber,
    initCode: any,
    encodedCallData: string,
    signatures: Array<string | undefined>,
  ) {
    try {
      const encodedSignatures = defaultAbiCoder.encode(['bytes[]'], [signatures]);

      const builder = new UserOperationBuilder()
        .useDefaults({
          preVerificationGas: 200_000,
          callGasLimit: 200_000,
          verificationGasLimit: 3_000_000,
        })
        .setSender(walletContract)
        .setNonce(nonce)
        .setCallData(encodedCallData)
        .setSignature(encodedSignatures)
        .setInitCode(initCode);

      return builder;
    } catch (error: any) {
      return error;
    }
  }

  const getEntryPointContract = () => {
    const bundlerProvider = new ethers.providers.JsonRpcProvider("https://api.stackup.sh/v1/node/88ea134e5270ba36996bbae58c714b510c4619da6f8aeda8f5b1657c16dc8995"); // still mumbai
    const entryPointContract = new ethers.Contract(
      Constants.ERC4337.EntryPoint,
      ENTRY_POINT_ABI,
      bundlerProvider
    );
    return entryPointContract;
  };

  const walletFactoryContract = () => {
    const bundlerProvider = new ethers.providers.JsonRpcProvider("https://api.stackup.sh/v1/node/88ea134e5270ba36996bbae58c714b510c4619da6f8aeda8f5b1657c16dc8995"); // still mumbai
    const walletFactoryContractInstance = new ethers.Contract(
      "0xe8A95711Bc29b33d68535585071c69C37BDc3B54", // need to change it to sepolia
      WALLET_FACTORY_ABI,
      bundlerProvider
    );
    return walletFactoryContractInstance;
  };

  const getWalletContract = () => {
    const walletContract = new ethers.Contract("0x8bE4D5134764037021B3d474104C6CD6F147a63d", WALLET_ABI, provider);
    return walletContract;
  };

  async function getUserOpForTransaction(
    walletAddress: string,
    receiverAddress: string,
    value: BigNumber,
    initCode: any,
    data: any,
  ) {
    try {
      let walletContract = getWalletContract();
      console.log("Contractttt",walletContract)
      const bundlerProvider = new ethers.providers.JsonRpcProvider("https://api.stackup.sh/v1/node/88ea134e5270ba36996bbae58c714b510c4619da6f8aeda8f5b1657c16dc8995"); // still mumbai
      const entryPointContract = getEntryPointContract();

      const encodedCallData = walletContract.interface.encodeFunctionData('execute', [receiverAddress, value, data]);
      const nonce = await entryPointContract.getNonce(walletAddress, 0);

      // builderOp is a function in builderOp.ts file
      const builder = await builderOp(walletContract.address, nonce, initCode, encodedCallData, []);
      builder.useMiddleware(Presets.Middleware.getGasPrice(bundlerProvider)); // why error?
      const client = await Client.init("https://api.stackup.sh/v1/node/88ea134e5270ba36996bbae58c714b510c4619da6f8aeda8f5b1657c16dc8995");
      await client.buildUserOperation(builder);
      let userOp = builder.getOp();

      //   const postData = {
      //     smartWalletAddress: walletAddress,
      //     userOp: userOp,
      //   };

      return userOp;
    } catch (error: any) {
      return error;
    }
  }
  console.log(signer);
  const tokenContract = new ethers.Contract(
   "0x03A0888F3974FB419745b3E57c6Fe5D37975673c", // DB se lana h ye
    ERC721_CONTRACT_ABI,
    provider
  );

  console.log('Token Contract:', tokenContract);

  async function generateEncodedData(
    functionName: string,
    functionParams: any
  ) {
    const data = tokenContract.interface.encodeFunctionData(
      functionName,
      functionParams
    );
    return data;
  }

  const builderForTransaction = async (
    walletAddress: string,
    toAddress: string,
    amount: string,
    nativeTransfer: boolean,
    chain: string,
    isPaymaster: boolean,
    paymasterPrivateKey?: string,
    functionName?: string,
    functionParams?: Array<string>
  ) => {
    let initCode = Uint8Array.from([]);
    let data;
    if (nativeTransfer) {
      data = Uint8Array.from([]);
      console.log("Ohhhhh",data)
    } else {
      data = await generateEncodedData(functionName!, functionParams!); // to be imported from another file
    }
    const amountInBignumber = ethers.utils.parseEther(amount);
    // console.log(walletAddress, toAddress, amountInBignumber, initCode, data)
    const userOp = await getUserOpForTransaction(
      walletAddress,
      toAddress,
      amountInBignumber,
      initCode,
      data
    );
    console.log('Real UserOp:', userOp);
    if (isPaymaster) {
      // maybe used later on

      // userOp.paymasterAndData = await composePaymasterAndData(
      //   userOp,
      //   chain,
      //   paymasterPrivateKey
      // );

      // // to be imported from another file
      // const userOpHash = await contract.getUserOpHash(userOp, chain);

      // // to be imported from another file
      // const signatures = await getSignatures(
      //   userOpHash,
      //   deployer_key,
      //   env,
      //   paymasterPrivateKey
      // );

      // // to be imported from another file
      // const builder = await contract.builderOp(
      //   userOp.sender,
      //   BigNumber.from(userOp.nonce),
      //   initCode,
      //   userOp.callData.toString(),
      //   signatures
      // );

      // // to be imported from another file
      // const finalPaymasterAndData = await this.composePaymasterAndData(
      //   userOp,
      //   env,
      //   chain,
      //   paymasterPrivateKey
      // );

      // builder
      //   .setMaxFeePerGas(userOp.maxFeePerGas)
      //   .setMaxPriorityFeePerGas(userOp.maxPriorityFeePerGas)
      //   .setPaymasterAndData(finalPaymasterAndData);

      // return builder;
    }

    // to be imported from another file
    const userOpHash = await getUserOpHash(userOp, chain);

    // Metamask interaction
    const signatures = await getSignatures(
      userOpHash
    );

    // to be imported from another file
    console.log(userOp.sender, BigNumber.from(userOp.nonce), initCode, userOp.callData.toString(), signatures)
    const builder = await builderOp(
      userOp.sender,
      BigNumber.from(userOp.nonce),
      initCode,
      userOp.callData.toString(),
      signatures
    );

    console.log("oh nooo shit", builder)

    builder
      .setMaxFeePerGas(userOp.maxFeePerGas)
      .setMaxPriorityFeePerGas(userOp.maxPriorityFeePerGas);

    return builder;
  };

  const sendEthers = async () => {
    const builder = await builderForTransaction(
      "0x8bE4D5134764037021B3d474104C6CD6F147a63d", // to be fetched from db
      "0x9b95BCF77c4A47903aD43d0afD64af92dF464fDF", // to addresss
      "0.01", // value
      true,
      "mumbai",
      false
    );

    const client = await Client.init("https://api.stackup.sh/v1/node/fcb5c38bd4ce5b3b4a8825b1938f5d52784c0bc3b9376bf5d06ccecbc257027a");
    const result = await client.sendUserOperation(builder);

    const receipt = await result.wait();

    const transactionReceipt = await receipt?.getTransactionReceipt();
    console.log("Transaction Receipt:", transactionReceipt?.transactionHash);
  }





  console.log('Contract Data:', contractData);

  return (
    <div className='p-5 flex flex-col justify-around h-[90vh] gap-5 mt-40'>
      ID : {id}


      <div>
        <div className='text-2xl font-semibold'>
          Artist : {contractData.artistName}
        </div>
        <div className='text-sm text-gray-600'>
          Track Name : {contractData.trackName}
        </div>
      </div>

      <div>
        <div className='text-2xl font-semibold'>
          Contract Address : {contractData.contractAddress}
        </div>
        <div className='text-sm text-gray-600'>
          Contract Name : {contractData.userID}
        </div>
      </div>

      <div className='px-5 grid grid-cols-3 gap-5 h-1/2'>
        <div className='bg-gray-100 h-full rounded-xl flex flex-col justify-center items-center gap-4'>

          <span className='text-xl font-bold'> Transfer </span>
          <div className='flex flex-col items-center mb-2'>
            <label htmlFor='amount' className='mb-1'>Amount in ETH:</label>
            <input type='number' id='amount' className='border border-gray-300 rounded-md p-1 w-full' />
          </div>

          <div className='flex flex-col items-center'>
            <label htmlFor='recipient' className='mb-1 '>Send to:</label>
            <input type='text' id='recipient' className='border border-gray-300 rounded-md p-1' />
          </div>

          <button className='bg-black text-white w-1/2 py-3 rounded-lg' onClick={sendEthers}> Send </button>
        </div>

        <div className='bg-gray-100 flex justify-center h-full items-center rounded-xl'>
          Mint
        </div>

        <div className='bg-gray-100 flex justify-center h-full items-center rounded-xl'>
          Burn
        </div>
      </div>

      <div>
        <CodeEditor />
      </div>

    </div>
  )
}

export default ContractInteraction