"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import Token from "../public/templates/Token.png";
import NFT from "../public/templates/NFT.png";
import Staking from "../public/templates/Staking.png";
import Farm from "../public/templates/Farm.png";
import Marketplace from "../public/templates/Marketplace.png";
import Launchpad from "../public/templates/Launchpad.png";
import Vault from "../public/templates/Vault.png";
import Image from "next/image";
import Audit from "./Audit";
import { useState } from "react";
import { Ban } from "lucide-react";

import CodeEditor from "./CodeEditor";
const TemplateData = [
  {
    id: 1,
    name: "Token",
    description: "Generate a ethereum custom token",
    icon: Token,
  },
  {
    id: 2,
    name: "NFT",
    description: "Generate a ethereum custom NFT",
    icon: NFT,
  },
  {
    id: 3,
    name: "Staking",
    description: "Generate a ethereum custom NFT",
    icon: Staking,
  },
  {
    id: 4,
    name: "Farm",
    description: "Generate a ethereum custom NFT",
    icon: Farm,
  },
  {
    id: 5,
    name: "Marketplace",
    description: "Generate a ethereum custom NFT",
    icon: Marketplace,
  },
  {
    id: 6,
    name: "Launchpad",
    description: "Generate a ethereum custom NFT",
    icon: Launchpad,
  },
  // {
  //   id: 7,
  //   name: "Vault",
  //   description: "Generate a ethereum custom NFT",
  //   icon: Vault,
  // },
];

const Dashboard = () => {
  const [showTemplate, setShowTemplate] = useState("new-template");

  const toggleTemplate = () => {
    if (showTemplate === "new-template") {
      setShowTemplate("already-created-template");
    } else {
      setShowTemplate("new-template");
    }
  };

  console.log(showTemplate);
  return (
    <div className="h-full w-screen bg-black text-white p-10 flex flex-col gap-10">
      <div className="border-[1px] py-5 px-10 rounded-2xl border-gray-700 h-full flex gap-10 flex-col justify-between">
        <div className="inline-flex">
          {/* TODO: Functionality lgani h  */}
          <div className="p-1 border-gray-500 flex border-[1px] gap-2 rounded-md">
            <div
              className={
                showTemplate === "new-template"
                  ? "bg-white text-black px-2 rounded-sm cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={toggleTemplate}
            >
              New Templates
            </div>
            <div
              className={
                showTemplate === "already-created-template"
                  ? "bg-white text-black px-2 rounded-sm cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={toggleTemplate}
            >
              Already Created Templates
            </div>
          </div>
        </div>

        {showTemplate === "new-template" ? (
          <>
            <div className="flex  justify-between items-center border-gray-700 border-[1px] rounded-2xl py-10 px-8">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">
                  {" "}
                  Ethereum AI Builder
                </span>
                <span className="text-sm">
                  {" "}
                  Generate you custom DEFI application for Ethereum
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <span> Slelct Target Chain </span>
                <select className="text-black min-w-40 p-2 rounded-md">
                  <option className="py-2">Ethereum </option>
                  <option className="py-2">Binance</option>
                  <option className="py-2">Polygon</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-gray-700 border-[1px] px-8 rounded-2xl py-10">
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">
                  {" "}
                  Select Templates{" "}
                </span>
                <span className="teext-sm">
                  Choose modules to activate on your project, you can configure
                  them later
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 cursor-pointer">
                {TemplateData.map((data) => {
                  return (
                    <div
                      className="flex flex-col gap-3 justify-centerc items-center py-10 border-[0.5px] bg-white text-black border-gray-400 rounded-2xl min-w-36 min-h-32"
                      key={data.id}
                    >
                      <div>
                        <Image
                          src={data.icon}
                          alt="icon"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col justify-center text-center">
                        <span className="text-xl font-semibold">
                          {data.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {data.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>last row</div>
            </div>
          </>
        ) : (
          <div className="justify-center flex items-center">
            <div className="flex flex-col gap-3 px-10 justify-centerc items-center py-10 border-[0.5px] bg-white text-black border-gray-400 rounded-2xl min-w-36 min-h-32">
              <div>
                <Ban size={50} />
              </div>
              <div className="flex flex-col justify-center text-center">
                <span className="text-xl font-semibold">
                  No Contracts Available
                </span>
              </div>
            </div>
          </div>
        )}

        
      </div>
      <Audit />
      <CodeEditor />
    </div>
  );
};

export default Dashboard;
