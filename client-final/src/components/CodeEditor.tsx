import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Download, Clipboard } from 'lucide-react';

const CodeValue = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract EtherEaseContract is ERC721, ERC721URIStorage, ERC721Burnable {
    uint256 private _nextTokenId;

    /**
     * @dev Constructor function to initialize the contract with the specified name and symbol.
     * @param name The name of the ERC721 token.
     * @param symbol The symbol of the ERC721 token.
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /**
     * @dev Mints a new token and assigns it to the specified address.
     * @param to The address to which the minted token will be assigned.
     * @param uri The URI (Uniform Resource Identifier) of the token's metadata.
     */
    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev Retrieves the URI of the metadata associated with the specified token.
     * @param tokenId The unique identifier of the token for which the URI is requested.
     * @return The URI of the token's metadata.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Checks whether the contract supports a given interface ID as per ERC165.
     * @param interfaceId The interface ID to check for support.
     * @return true if the contract supports the specified interface, otherwise false.
     */
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Burns (destroys) the specified token, removing it from circulation.
     * @param tokenId The unique identifier of the token to be burned.
     */
    function burn(uint256 tokenId) public override {
        _burn(tokenId);
    } 
}`;

const CodeEditor = () => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CodeValue)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(error => console.error('Error copying to clipboard: ', error));
  };

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
          <button
            className="px-2 py-1 bg-white text-black rounded-lg flex items-center gap-3"
            onClick={copyToClipboard}
          >
            <span>{copied ? 'Copied!' : 'Copy'}</span>
            <Clipboard />
          </button>
          <button className="px-2 py-1 bg-white text-black rounded-lg flex items-center gap-3">
            <span>Download Audit Report</span> <Download />
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
