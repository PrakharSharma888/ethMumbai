import React, { useEffect } from "react";
import SportsImg from "../../assets/SportsBG.png";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import axios from "axios";
import { ERC721_CONTRACT_ABI, ERC721_CONTRACT_BYTECODE } from "../../../../blockchain/utils/abi";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import toast, { Toaster } from 'react-hot-toast';

const SportsAchivement = () => {
    const [name, setName] = useState("");
    const [sportsPlayed, setSportsPlayed] = useState("");
    const [achivement, setAchivement] = useState("");
    const [yearOfExperiance, setYearOfExperiance] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [contractData, setContractData] = useState({})
    const route = useNavigate();

    const [certificate, setCertificate] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signer, user } = useContext(UserContext);

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

    useEffect(() => {
        return () => {
            if (imageURL) {
                URL.revokeObjectURL(imageURL);
            }
        };
    }, [imageURL]);

    const handleSubmit = async () => {
        setLoading(true);
        const factory = new ethers.ContractFactory(
            ERC721_CONTRACT_ABI,
            ERC721_CONTRACT_BYTECODE,
            signer
        );

        const Deployedcontract = await factory.deploy(tokenName, tokenSymbol);
        await Deployedcontract.deployed(); // await here

        console.log("Deployed Contract here:", Deployedcontract);
        setContractData(Deployedcontract.address);

        if (Deployedcontract.address && user) {
            const res = await axios.post("http://localhost:8080/contract/createSportsContract", {
                SportsMName: name,
                sportsPlayed: sportsPlayed,
                achivement: achivement,
                yearOfExperiance: yearOfExperiance,
                TokenName: tokenName,
                TokenSymbol: tokenSymbol,
                contractAddress: Deployedcontract.address,
                userID: user._id,
            })

            if (res.data) {
                setLoading(false);
            }
            toast.success("NFT Contract Deployed Successfully");
            setTimeout(() => {
                route(`/contract/${res.data.contract._id}`)
            }, 1000)
        } else {
            alert('Error in Deploying Contract')
        }
    }

    const handleRemoveImage = () => {
        setCertificate(null);
        setImageURL(null);
    }

    const handleFileChange = (e) => {
        setCertificate(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="pt-32 text-white px-10 h-full">
            <Toaster />
            <div className=" border-[1px] border-[#2f2f2f] h-full flex py-5">
                <div className="w-4/12 h-full flex justify-center pt-10">
                    <img src={SportsImg} alt="Sports" className="w-4/5 h-fit" />
                </div>

                <div className="w-8/12 h-full">
                    <div className="px-3 pt-10 flex flex-col gap-3">
                        <div className="text-5xl font-medium">Sports Achievement</div>

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
                        <div className="text-3xl font-light pt-4">Give us some Info</div>

                        <div className="flex gap-5 flex-col pt-5">
                            <div>
                                <span className="text-sm"> Your Name </span>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
                            <div>
                                <span className="text-sm"> Sports Played </span>
                                <input
                                    value={sportsPlayed}
                                    onChange={(e) => setSportsPlayed(e.target.value)}
                                    type="text"
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
                            <div>
                                <span className="text-sm"> Achievement </span>
                                <input
                                    type="text"
                                    value={achivement}
                                    onChange={(e) => setAchivement(e.target.value)}
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
                            <div>
                                <span className="text-sm"> Year of Experience </span>
                                <input
                                    type="text"
                                    value={yearOfExperiance}
                                    onChange={(e) => setYearOfExperiance(e.target.value)}
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mb-2 text-start">
                                    Upload Relevant Certificate
                                </label>

                                <div className="flex items-center justify-center w-full">
                                    {imageURL ? (
                                        <div className="relative">
                                            <img src={imageURL} alt="Uploaded" className="w-full h-64 object-cover" />
                                            <button onClick={handleRemoveImage} className="bg-red-500 text-white rounded-md p-2">
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            Upload Certificates
                                            <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm"> Token Name </span>
                                <input
                                    type="text"
                                    value={tokenName}
                                    onChange={(e) => setTokenName(e.target.value)}
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
                            <div>
                                <span className="text-sm"> Token Symbol </span>
                                <input
                                    type="text"
                                    value={tokenSymbol}
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    className="w-full bg-transparent border-[1px] border-[#2f2f2f] rounded-md p-2"
                                />
                            </div>
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

export default SportsAchivement;
