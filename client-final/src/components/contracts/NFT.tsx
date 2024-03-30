import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERC721_CONTRACT_ABI, ERC721_CONTRACT_BYTECODE } from "../../../../blockchain/utils/abi";
import { ethers } from "ethers";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const NFT = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const { signer, user } = useContext(UserContext);
  const [showNFTForm, setShowNFTForm] = useState(false);
  const route = useNavigate();

  if (!user) {
    route("/")
  }

  useEffect(() => {
    const getAcc = async () => {
      try {
        if (signer) {
          const address = await signer.getAddress();
          console.log("User Address:", address);
        } else {
          console.error("Signer not available.");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    getAcc();
  }, [signer, tokenName, tokenSymbol]);

  const handleSubmit = async () => {
    setLoading(true);
    const factory = new ethers.ContractFactory(
      ERC721_CONTRACT_ABI,
      ERC721_CONTRACT_BYTECODE,
      signer
    );
    const contract = await factory.deploy(tokenName, tokenSymbol);
    await contract.deployed(); // await here
    console.log("Contract:", contract);

    console.log("Track Name:", trackName);

    const res = await axios.post("http://localhost:8080/contract/createMusicNFTContract", {
      contractAddress: contract.address,
      trackName,
      artistName: trackArtist,
      userID: user._id,
    })

    if(res.data){
      setLoading(false);
    }
    toast.success("NFT Contract Deployed Successfully");
    setTimeout(() => {
      route(`/contract/${res.data.contract._id}`)
    }, 1000)
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-gray-300 text-white border-[1px] rounded-lg shadow-xl">
      <Toaster />
      <h2 className="text-xl font-semibold mb-4">Deploy NFT Contract</h2>
      <label className="block mb-4">
        Track Name :
        <input
          type="text"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          className="block w-full text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>

      <label className="block mb-4">
        Trak Artist
        <input
          type="text"
          value={trackArtist}
          onChange={(e) => setTrackArtist(e.target.value)}
          className="block w-full text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-2">
        Token Name:
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          className="block w-full mt-1 text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <label className="block mb-4">
        Token Symbol:
        <input
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="block w-full text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
      >
        <span> { loading ? ('Deploying.....') : ('Deploy')}</span>
      </button>

    </div>
  );
};

export default NFT;
