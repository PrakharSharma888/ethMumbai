import { BigNumber } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { Constants, UserOperationBuilder, Presets, Client } from 'userop';

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