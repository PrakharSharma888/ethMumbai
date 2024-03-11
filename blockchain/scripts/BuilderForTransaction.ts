import {ethers, utils, BigNumber} from 'ethers';

async function builderForTransaction(
    walletAddress: string,
    toAddress: string,
    amount: string,
    nativeTransfer: boolean,
    chain: string,
    isPaymaster: boolean,
    deployer_key: string,
    paymasterPrivateKey?: string,
    functionName?: string,
    functionParams?: Array<string>,
  ) {
    let initCode = Uint8Array.from([]);
    let data;
    if (nativeTransfer) {
      data = Uint8Array.from([]);
    } else {
      data = await generateEncodedData(functionName!, functionParams!); // to be imported from another file
    }
    const amountInBignumber = utils.parseEther(amount);
    const userOp = await contract.getUserOpForTransaction( // to be imported from another file
      walletAddress,
      toAddress,
      amountInBignumber,
      initCode,
      data
    );
    if (isPaymaster) {
        // to be imported from another file
      userOp.paymasterAndData = await contract.composePaymasterAndData(userOp, env, chain, paymasterPrivateKey);

      // to be imported from another file
      const userOpHash = await contract.getUserOpHash(userOp, chain);

      // to be imported from another file
      const signatures = await getSignatures(userOpHash, deployer_key, env, paymasterPrivateKey);

      // to be imported from another file
      const builder = await contract.builderOp(
        userOp.sender,
        BigNumber.from(userOp.nonce),
        initCode,
        userOp.callData.toString(),
        signatures,
      );

      // to be imported from another file
      const finalPaymasterAndData = await this.composePaymasterAndData(userOp, env, chain, paymasterPrivateKey);

      builder
        .setMaxFeePerGas(userOp.maxFeePerGas)
        .setMaxPriorityFeePerGas(userOp.maxPriorityFeePerGas)
        .setPaymasterAndData(finalPaymasterAndData);

      return builder;
    }

    // to be imported from another file
    const userOpHash = await contract.getUserOpHash(userOp, chain);

    // Metamask interaction
    const signatures = await getSignatures(userOpHash, deployer_key, paymasterPrivateKey); 

    // to be imported from another file
    const builder = await contract.builderOp(
      userOp.sender,
      BigNumber.from(userOp.nonce),
      initCode,
      userOp.callData.toString(),
      signatures,
    );

    builder.setMaxFeePerGas(userOp.maxFeePerGas).setMaxPriorityFeePerGas(userOp.maxPriorityFeePerGas);

    return builder;
  }