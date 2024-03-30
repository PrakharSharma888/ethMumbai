import { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import { ethers } from "ethers";
import { WALLET_FACTORY_ABI } from "../../../blockchain/utils/abi.js";


export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { eoa, setUser, signer } = useContext(UserContext)
  console.log('walletAddress:', eoa);

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [smartWalletAddress, setSmartWalletAddress] = useState("");

  function generateSalt() {
    const buffer = new Uint8Array(32); // 32 bytes for salt
    window.crypto.getRandomValues(buffer);
    const hexString = buffer.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    return '0x' + hexString;
  }

  const walletFactoryContract = () => {
    const bundlerProvider = new ethers.providers.JsonRpcProvider("https://api.stackup.sh/v1/node/88ea134e5270ba36996bbae58c714b510c4619da6f8aeda8f5b1657c16dc8995"); // still mumbai
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

  const createAccountAddress = async (
  ) => {
    setLoading(true);
    const address = ["0x9b95BCF77c4A47903aD43d0afD64af92dF464fDF"]; // to be added
    let owners: string[] = [];
    let salt: string;

    owners.push(...address);
    salt = generateSalt()
    console.log("Salt: ", salt);
    const walletFactoryContractInst = walletFactoryContract();
    const smartWalletAddress = await walletFactoryContractInst.connect(signer).createAccount(owners, salt);
    await smartWalletAddress.wait();
    const walletAddress = await getWalletAddress(owners, salt);
    setSmartWalletAddress(walletAddress);
    setLoading(false);
    // addresss
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (smartWalletAddress) {
      axios.post("http://localhost:8080/api/createUser", {
        name: userName,
        email: email,
        eoa,
        smartWalletAddress: smartWalletAddress
      })
        .then((res) => {
          console.log(res.data);
          const token = res.data.token;
          Cookies.set('token', token);
          toast.success('User created successfully');
          setUser(res.data.user)
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      toast.error('Please generate smart wallet address');
    }
  };

  if (!eoa) {
    return (
      <div>
        You are Not Registered
        <button onClick={() => navigate('/signup')}> Click Here </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-md w-full space-y-8">

        <div>
          You are not registered, please register here
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Wallet Address</label>
              <input
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="WalletAddress"
                value={eoa}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Wallet Address</label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Smart WalletAddress"
                value={smartWalletAddress}
              />
            </div>
          </div>
          {
            smartWalletAddress ? (<div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>) : (
              <div>
                <button
                  onClick={createAccountAddress}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>{loading ? ('Generating Smart Wallet Addte....') : ('Generate Smart Address')} </span>
                </button>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
}
