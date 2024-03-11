import { ethers } from "ethers";
import { TOKEN_CONTRACT_ABI } from "../utils/abi";

const ethProvider = new ethers.providers.JsonRpcProvider("eth_rpc_url"); // to be added
const tokenContract = new ethers.Contract(
    "TOKEN_CONTRACT_ADDRESS",
    TOKEN_CONTRACT_ABI,
    ethProvider,
  );

async function generateEncodedData(functionName: string, functionParams: any) {
    const data = tokenContract.interface.encodeFunctionData(functionName, functionParams);
    return data;
  }