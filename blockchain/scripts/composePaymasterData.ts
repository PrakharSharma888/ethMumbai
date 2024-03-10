import { ethers, Wallet } from "ethers"
import { arrayify, defaultAbiCoder, hexConcat } from "ethers/lib/utils";
import { PAYMASTER_ABI } from "../utils/abi";
export const MOCK_VALID_UNTIL = '0x00000000deadbeef';
export const MOCK_VALID_AFTER = '0x0000000000001234';

async function composePaymasterAndData(ops: any, paymasterPrivateKey?: any) {
  ops.paymasterAndData = hexConcat([
    "paymasterAddress",
    defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]),
    '0x' + '00'.repeat(65),
  ]);
  ops.signature = '0x';

  const provider = new ethers.providers.JsonRpcProvider("rpc_url"); // to be added

  const payMasterContract = new ethers.Contract(
    "PaymasterAddress",
    PAYMASTER_ABI,
    provider
  )
  
  const signer = new Wallet(paymasterPrivateKey, provider);

  const hash = await payMasterContract.connect(signer).getHash(ops, MOCK_VALID_UNTIL, MOCK_VALID_AFTER);
  const sign = await signer.signMessage(arrayify(hash));
  const paymasterAndData = hexConcat([
    "PaymasterAddress",
    defaultAbiCoder.encode(['uint48', 'uint48'], [MOCK_VALID_UNTIL, MOCK_VALID_AFTER]),
    sign,
  ]);
  return paymasterAndData;
} 