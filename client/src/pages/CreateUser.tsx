import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ethers } from 'ethers'
import { WALLET_FACTORY_ABI } from "../../../blockchain/utils/abi";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const walletAddress = location.state?.walletAddress || null;
  const [error, setError] = useState(null);
  const [salt, setSalt] = useState<string>('');
  const [smartWalletAddress, setSmartWalletAddress] = useState<string>('');

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  const walletFactoryContract = () => {
    const walletFactoryContractInstance = new ethers.Contract(
      "0xe8A95711Bc29b33d68535585071c69C37BDc3B54", // mumbai
      WALLET_FACTORY_ABI,
      provider
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

  const generateRandomBytes = (length: number): Uint8Array => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return array;
  };

  const bytesToHex = (bytes: Uint8Array): string => {
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  };

  const generateRandomSalt = (): void => {
    const randomBytes = generateRandomBytes(32);
    const hexSalt = '0x' + bytesToHex(randomBytes);
    setSalt(hexSalt);
  };

  const createAccount = async (
    address: string[]
  ) => {
    let owners: string[] = []; 

    owners.push(...address);
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    
    generateRandomSalt()
    const walletFactoryContractInst = walletFactoryContract();
    const smartWalletAddress = await walletFactoryContractInst.connect(signer).createAccount(owners,salt, {gasLimit: 3000000}); 
    await smartWalletAddress.wait();
    const walletAddress = await getWalletAddress(owners, salt);
    setSmartWalletAddress(walletAddress)
  };

  useEffect(() => {
    if (!walletAddress) {
      navigate("/"); 
    }
  }, [walletAddress, navigate]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    walletAddress: walletAddress,
  });

  const CreateNewUser = async () => {
    createAccount(["0x5aAB360f4eEC9C823175711d22D7D0C920D4481a"])
    // axios.post("http://localhost:8080/createUser", newUser).then((res: any) => {
    //   // TODO : idhr se navigate krna hai dashboard pr
    //   // User Validation (if already exist or not)
    //   // Aadhar wali cheez
    // });
  };

  return (
    <>
      <div className="bg-gray-800 text-white flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-1/2">
          {/* <div className="bg-white p-2 text-black rounded-xl cursor-pointer">
            <p> {walletAddress || "Address nhi h"}</p>
          </div> */}

          <div>Create New Account</div>
          <div className="flex flex-col bg-white text-black p-2 gap-4 rounded-xl w-full">
            <input
              type="text"
              placeholder="Wallet Address"
              value={newUser.walletAddress}
              disabled={true}
              className=" p-1  rounded-xl"
            />
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              className=" p-1  rounded-xl"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              value={newUser.name}
            />
            <input
              type="text"
              placeholder="Enter Email ID"
              className="p-1 rounded-xl"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              value={newUser.email}
            />
            <button
              className="bg-blue-500 p-2 rounded-xl"
              onClick={CreateNewUser}
            >
              Create Smart Wallet
            </button>
            Your Smart wallet Address is: {smartWalletAddress}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
