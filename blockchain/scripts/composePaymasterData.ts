import { ethers } from "ethers"

function composePaymasterAndData(ops: any, chain: string, paymasterPrivateKey?: any) {
  ops.paymasterAndData = hexConcat([
    payMasterAddress[chain][env],
    defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]),
    '0x' + '00'.repeat(65),
  ]);
  ops.signature = '0x';

  const payMasterContract = getPayMasterContract(env, chain);
  const signer = new Wallet(paymasterPrivateKey, initializeProvider(chain, env));

  const hash = await payMasterContract.connect(signer).getHash(ops, MOCK_VALID_UNTIL, MOCK_VALID_AFTER);
  const sign = await signer.signMessage(arrayify(hash));
  const paymasterAndData = hexConcat([
    payMasterAddress[chain][env],
    defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]),
    sign,
  ]);
  return paymasterAndData;
} 