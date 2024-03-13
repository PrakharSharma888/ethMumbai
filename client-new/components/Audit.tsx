import React from "react";
import { Download } from "lucide-react";

const Audit = () => {
  return (
    <div className="border-gray-700 rounded-2xl px-10 border-[0.5px] flex flex-col py-5 gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-medium"> Smart Contract Audit </span>
          <span className="text-sm text-gray-400">
            {" "}
            Get to Know how’s your Ethereum Smart Contract{" "}
          </span>
        </div>
        <button className="bg-white text-black rounded-lg px-2 py-1 flex gap-3 items-center">
          <span>Download Audit </span>
          <Download strokeWidth={1.5} size={20} />
        </button>
      </div>

      <div className="flex justify-between w-full gap-5">
        <div className="border-[1px] rounded-xl border-gray-600 w-1/2 p-3">
          <span className="text-xl font-medium">Audit Score</span>
          <div className="relative py-5 px-5 flex gap-4 flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                46%
              </span>
            </div>
            <div className="flex h-2 overflow-hidden rounded bg-gray-200">
              <div
                style={{ width: "46%" }}
                className="flex flex-col whitespace-nowrap text-xs justify-center bg-yellow-500"
              ></div>
            </div>
            <div className=" flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span> High Severity </span>
                <span>2</span>
              </div>
              <div className="flex justify-between">
                <span> Medium Severity </span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span> Low Severity </span>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-[1px] rounded-xl border-gray-600 w-1/2 p-3 flex flex-col gap-10">
          <span className="text-xl font-medium">Risk Factors</span>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex justify-between ">
              <span>Miniting Restriction Bypass</span>
              <span className="text-red-500 font-medium"> VERY HIGH</span>
            </div>
            <div className="flex justify-between">
              <span>Anti Whale logic pass</span>
              <span className="text-yellow-500 font-medium"> MEDIUM </span>
            </div>
            <div className="flex justify-between">
              <span>Fee transfer to connect</span>
              <span className="text-green-500 font-medium"> LOW </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;
