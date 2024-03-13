import { ChevronDown } from "lucide-react";
import React from "react";
import { Layers } from "lucide-react";
import { Coins } from "lucide-react";
import { Image } from "lucide-react";

import { Tractor } from "lucide-react";

const TemplateData = [
  {
    id: 1,
    name: "Token",
    description: "Generate a ethereum custom token",
    icon: <Coins size={24} />,
  },
  {
    id: 2,
    name: "NFT",
    description: "Generate a ethereum custom NFT",
    icon: <Image size={24} />,
  },
  {
    id: 3,
    name: "Staking",
    description: "Generate a ethereum custom NFT",
    icon: <Layers size={24} />,
  },
  {
    id: 4,
    name: "Farm",
    description: "Generate a ethereum custom NFT",
    icon: <Layers size={24} />,
  },
  {
    id: 5,
    name: "Marketplace",
    description: "Generate a ethereum custom NFT",
    icon: <Layers size={24} />,
  },
  {
    id: 6,
    name: "Launchpad",
    description: "Generate a ethereum custom NFT",
    icon: <Layers size={24} />,
  },
  {
    id: 6,
    name: "Vault",
    description: "Generate a ethereum custom NFT",
    icon: <Layers size={24} />,
  },
];

const Dashboard = () => {
  return (
    <div className="h-[92vh] w-screen bg-black text-white p-20">
      <div className="border-[1px] py-2 px-20 rounded-2xl border-gray-700 h-full flex flex-col justify-between py-5">
      <div className="p-1 border-1 border-gray-500 flex">
  <div className="bg-white text-black px-2">New Templates</div>
  <div>Already Created Templates</div>
</div>

        <div className="flex  justify-between items-center ">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold"> Ethereum AI Builder</span>
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

        <div className="flex overflow-y-auto gap-3">
          {TemplateData.map((data) => {
            return (
              <div
                className="flex gap-3 items-center py-3 flex-col border-[1px] border-gray-400 rounded-2xl min-w-36 min-h-32"
                key={data.id}
              >
                <div>{data.icon}</div>
                <div className="flex flex-col justify-center text-center">
                  <span className="text-xl font-semibold">{data.name}</span>
                  <span className="text-xs">{data.description}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div>last row</div>
      </div>
    </div>
  );
};

export default Dashboard;
