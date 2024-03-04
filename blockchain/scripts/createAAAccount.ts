import { ethers, Wallet } from "ethers";
import { randomBytes } from "crypto";

const createAccount = async (
  address: string[],
  privateKey: string,
  chain: string,
  env: string
) => {
  const provider = new ethers.JsonRpcProvider("rpc_url"); // to be added
  let owners: string[] = [];
  let salt: string;
  const signer = new Wallet(privateKey, provider); // need this to connect to metamask

  owners.push(...address);
  salt = "0x" + randomBytes(32).toString("hex");
  const walletFactoryContractInst = walletFactoryContract(env);
  const smartWalletAddress = await walletFactoryContractInst
    .connect(signer)
    .createAccount(owners,salt); 
  await smartWalletAddress.wait();
  const walletAddress = await getWalletAddress(this.owners, this.salt, env);
};
