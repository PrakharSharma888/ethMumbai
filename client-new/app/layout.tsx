"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AccountContext } from "../context/context";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState<String>("");
  const router = useRouter();

  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "your-infura-id",
          },
        },
      },
    });
    return web3Modal;
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts()
      setAccount(accounts[0].address)
      router.push("/signup")
    } catch (err) {
      console.log("error:", err);
    }
  }

  async function abcd(){
    console.log("abcd")
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AccountContext.Provider value={account}>
          <Navbar connect={connect}/>
          {children}
        </AccountContext.Provider>
      </body>
    </html>
  );
}
