import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { Constants } from "userop";

async function getUserOpHash(userOp: any, chain: string) {
    // in future need a condition if it is an eth transfer or else

    // const userOp = await contract.getUserOpForTransaction(walletAddress, toAddress, amount, initCode, data);
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
      [keccak256(encodedUserOp), Constants.ERC4337.EntryPoint, "80001"],
    );

    return keccak256(encodedUserOpWithChainIdAndEntryPoint);
  }