"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";
import { AccountContext } from "../context/context";
import { useContext } from "react";
import Link from "next/link";

export default function Home() {
  const account = useContext(AccountContext);

  console.log("account:", account);

  return (
    <main className="h-screen w-screen bg-black flex items-center justify-center flex-col gap-4">
      <div className="text-white border-[1px] border-gray-600 py-2 px-3 rounded-full flex items-center drop-shadow-xl shadow-white">
        <span>Create, Customize, Audit and Deploy</span>{" "}
        <ChevronRight strokeWidth={1.25} />{" "}
      </div>
      <div className="text-7xl font-semibold text-center text-white">
        {" "}
        Instantly Generate, <br />
        <span> Smart Contracts </span>
      </div>
      <div className="text-lg text-gray-600 w-1/2 text-center">
        Effortless Smart Contract Creation for Web3 Pioneers. Elevate Your
        Blockchain Journey with SecureScript
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <button className="border-[.5px] text-white rounded-[8px] border-gray-700 p-2">
            Explore Contracts
          </button>
        </div>
        {
          account ? (
            <div>
              <Link href={'/profile'} className="border-[.5px] text-black bg-white rounded-[8px] p-2">
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <WalletConnect />
          )
        }
      </div>
    </main>
  );
}
