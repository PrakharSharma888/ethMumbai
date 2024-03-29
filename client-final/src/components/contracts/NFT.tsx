import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ERC721_CONTRACT_ABI,
  ERC721_CONTRACT_BYTECODE,
} from "../../../../blockchain/utils/abi";
import { ethers } from "ethers";
import { useContext } from "react";
import UserContext from "../../context/userContext";

const BasicForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    trackName: "",
    artistName: "",
    genre: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col gap-5 text-black">
        <input
          type="text"
          name="trackName"
          value={formData.trackName}
          onChange={handleChange}
          placeholder="Track"
          className="w-full py-1 px-2 rounded-xl "
          required
        />
        <input
          type="text"
          name="artistName"
          value={formData.artistName}
          onChange={handleChange}
          placeholder="Artist Name"
          className="w-full py-1 px-2 rounded-xl"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full py-1 px-2 rounded-xl"
          required
        />
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          className="w-full py-1 px-2 rounded-xl"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 mt-6 py-1 px-2 rounded-md">Submit</button>
    </form>
  );
};


const NFT = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const { signer } = useContext(UserContext);
  const [showNFTForm, setShowNFTForm] = useState(false);
  const route = useNavigate();

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
  }, [signer]);

  const handleBasicFormSubmit = (formData) => {
    // Handle basic form submission here
    // For example, you can set some state or perform any necessary actions
    setShowNFTForm(true);
  };

  const handleDeploy = async () => {
    setLoading(true);
    const factory = new ethers.ContractFactory(
      ERC721_CONTRACT_ABI,
      ERC721_CONTRACT_BYTECODE,
      signer
    );
    const contract = await factory.deploy(tokenName, tokenSymbol);
    contract.deployed();
    console.log("Contract:", contract);
    setLoading(false);
    route("/contract/demo");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-gray-300 text-white border-[1px] rounded-lg shadow-xl">
      {!showNFTForm ? (
        <BasicForm onSubmit={handleBasicFormSubmit} />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Deploy NFT Contract</h2>
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
            onClick={handleDeploy}
            disabled={!tokenName || !tokenSymbol || loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
          >
            {loading ? "Deploying..." : "Deploy"}
          </button>
        </>
      )}
    </div>
  );
};

export default NFT;
