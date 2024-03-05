import { ethers, Wallet } from "ethers";
import { randomBytes } from "crypto";
import { WALLET_FACTORY_ABI } from "../utils/abi";

const walletFactoryContract = () => {
  const bundlerProvider = new ethers.JsonRpcProvider("bundler_url"); // to be added
  const walletFactoryContractInstance = new ethers.Contract(
    "0xe8A95711Bc29b33d68535585071c69C37BDc3B54", // need to change it to sepolia
    WALLET_FACTORY_ABI,
    bundlerProvider
  );
  return walletFactoryContractInstance;
};

const getWalletAddress = async (owners: Array<string>, salt: string) => {
  try {
    const walletFactoryContractInst = walletFactoryContract();
    const walletAddress = await walletFactoryContractInst.getAddress(owners, salt);
    return walletAddress;
  } catch (error: any) {
    return {
      code: 0,
      error: error.message,
    };
  }
};

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
  const walletFactoryContractInst = walletFactoryContract();
  const smartWalletAddress = await walletFactoryContractInst.connect(signer).createAccount(owners,salt); 
  await smartWalletAddress.wait();
  const walletAddress = await getWalletAddress(owners, salt);

  // addresss
};
