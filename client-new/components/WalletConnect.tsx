import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button
        className="border-[.5px] rounded-[8px] text-black bg-white p-2"
      >
        Connect Wallet
      </button>
    </>
  );
};

export default WalletConnect;
