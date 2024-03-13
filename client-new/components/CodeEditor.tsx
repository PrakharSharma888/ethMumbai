"use client";
import React from "react";
import AceEditor from "react-ace";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { Clipboard } from "lucide-react";
import { Download } from "lucide-react";

const CodeValue = `contract MyToken is ERC1155, ERC1155Burnable {
  constructor(address initialOwner) ERC1155(""){}

  function setURI(string memory newuri) public{
      _setURI(newuri);
  }

  function mint(address account, uint256 id, uint256 amount, bytes memory data)
      public
  {
      _mint(account, id, amount, data);
  }
};`;

const CodeEditor = () => {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);
  return (
    <div className="border-gray-700 rounded-2xl px-10 border-[0.5px] flex flex-col py-5 gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-medium"> Smart Contact Code </span>
          <span className="text-sm">
            Get the smart contract for your ethereum project
          </span>
        </div>
        <div className="flex gap-5 items-center">
          <button className="px-2 py-1 bg-white text-black rounded-lg flex items-center gap-3">
            {" "}
            <span>Copy</span> <Clipboard />{" "}
          </button>
          <button className="px-2 py-1 bg-white text-black rounded-lg flex items-center gap-3">
            {" "}
            <span>Download Smart Contract</span> <Download />{" "}
          </button>
        </div>
      </div>

      <div className="border-gray-700 rounded-2xl p-5 border-[0.5px]">
        <CodeMirror
          value={CodeValue}
          className="h-full"
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
