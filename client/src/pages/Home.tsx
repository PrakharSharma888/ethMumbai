import React from "react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [wallerAddress, setWalletAddress] = useState("");

  const ConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
        setWalletAddress(accounts[0]);
        navigate("/createUser", { state: { walletAddress: accounts[0] } });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Ethereum is not installed");
    }
  };

  return (
    <>
      <div className="bg-gray-800 text-white flex justify-center items-center h-screen">
        {wallerAddress === "" ? (
          <Button onClick={ConnectWallet}>Connect Wallet</Button>
        ) : (
          <div>
            <p>Connected Wallet: {wallerAddress}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
