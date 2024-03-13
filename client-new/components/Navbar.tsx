"use client";

import React, { useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { AccountContext } from "../context/context";
import { useContext } from "react";
import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  connect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ connect }) => {
  const account = useContext(AccountContext);
  const [WalletAddress, setWalletAddress] = useState("");
  

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  console.log("account:", account);
  return (
    <div className="bg-black flex items-center justify-between py-3 px-5">
      <Link href={'/'}>
        <Image src={Logo} alt="Logo" height={170} width={170} className="p-1" />
      </Link>

      <div className="flex gap-4">
        <button className="border-[.5px] rounded-[8px] border-gray-400 text-white p-2">
          Explore Contacts
        </button>
        {account ? (
          <div className="border-[.5px] rounded-[8px] text-black bg-white p-2">
            {WalletAddress.substring(0, 5)}....{WalletAddress.slice(-5)}{" "}
          </div>
        ) : (
          <button
            onClick={connect}
            className="border-[.5px] rounded-[8px] text-black bg-white p-2"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
