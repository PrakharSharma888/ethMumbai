import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERC721_CONTRACT_ABI, ERC721_CONTRACT_BYTECODE } from "../../../../blockchain/utils/abi";
import { ethers } from "ethers";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import SportsImg from "../../assets/SportsBG.png";

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
    toast('Deployment Started!', {
      icon: '⏳',
    });
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

    if (res.data) {
      setLoading(false);
    }
    toast.success("NFT Contract Deployed Successfully");
    setTimeout(() => {
      route(`/contract/${res.data.contract._id}`)
    }, 1000)
  };


  return (
    <div className="text-white">

      <div className="pt-32 text-white px-10 h-full">
        <Toaster />
        <div className="border-[1px] border-[#2f2f2f] h-full flex py-5">
          <div className="w-4/12 h-full flex justify-center pt-10">
            <img src={SportsImg} alt="Sports" className="w-4/5 h-fit" />
          </div>

          <div className="w-8/12">
            <div className="px-3 pt-10 flex flex-col gap-3">
              <div className="text-5xl font-medium">Music NFT</div>

              <div>
                Lorem ipsum dolor sit amet consectetur. Enim eget facilisi
                facilisis blandit massa vitae. Quis turpis porta non euismod
                egestas pellentesque sed. Leo rutrum fames justo volutpat sed nisl
                etiam. Purus sapien ut pulvinar sed malesuada. Pellentesque nisl
                id magnis facilisis eu at iaculis. Aenean gravida nisi proin et.
                Mauris at cursus phasellus tortor tellus amet fusce bibendum. Vel
                vitae massa pharetra eget interdum massa senectus. Ipsum dui
                volutpat elit dapibus in felis donec. Mauris quam consectetur a
                bibendum felis. Scelerisque lectus velit congue nisl.
              </div>
            </div>

            <div className="h-[0.5px] mt-6 w-[120vh] bg-slate-700"></div>
            <div>
              <label className="block mb-4">
                <span className="text-sm"> Track Name :</span>
                <input
                  type="text"
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2 focus:outline-none"
                />
              </label>

              <label className="block mb-4">
                <span className="text-sm">Track Artist</span>
                <input
                  type="text"
                  value={trackArtist}
                  onChange={(e) => setTrackArtist(e.target.value)}
                  className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2 focus:outline-none"
                />
              </label>
              <label className="block mb-2">
                <span className="text-sm">Token Name:</span>

                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2 focus:outline-none"
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm">Token Symbol: </span>

                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2 focus:outline-none"
                />
              </label>
              <div onClick={handleSubmit} className="bg-white w-full py-2 rounded-lg text-black text-center">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-3">Loading...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default NFT;
