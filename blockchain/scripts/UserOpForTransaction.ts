import { BigNumber, ethers } from "ethers";
import { ENTRY_POINT_ABI, WALLET_FACTORY_ABI } from "../utils/abi";
import {Constants, Presets, Client} from 'userop'

let bundlerProvider : ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("bundler_url"); // to be added

const walletFactoryContract = () => {
    const walletFactoryContractInstance = new ethers.Contract(
      "0xe8A95711Bc29b33d68535585071c69C37BDc3B54", // need to change it to sepolia
      WALLET_FACTORY_ABI,
      bundlerProvider
    );
    return walletFactoryContractInstance;
  };

const getEntryPointContract = () => {
    const entryPointContract = new ethers.Contract(
      Constants.ERC4337.EntryPoint,
      ENTRY_POINT_ABI,
      bundlerProvider
    );
    return entryPointContract;
  };

async function getUserOpForTransaction(
    walletAddress: string,
    receiverAddress: string,
    value: BigNumber,
    initCode: any,
    data: any,
  ) {
    try {
      let walletContract = walletFactoryContract();

      const entryPointContract = getEntryPointContract();

      const encodedCallData = walletContract.interface.encodeFunctionData('execute', [receiverAddress, value, data]);
      const nonce = await entryPointContract.getNonce(walletAddress, 0);
      
      // builderOp is a function in builderOp.ts file
      const builder = await builderOp(walletContract.address, nonce, initCode, encodedCallData, []);
      builder.useMiddleware(Presets.Middleware.getGasPrice(bundlerProvider)); // why error?
      const client = await Client.init("Bundler_rpc");
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