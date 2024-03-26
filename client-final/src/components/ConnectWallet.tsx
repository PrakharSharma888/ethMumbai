import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserProvider} from 'ethers'
import axios from 'axios';


const ConnectWallet = ({ walletAddress, setWalletAddress }) => {
    const navigate = useNavigate();
    const [userNotFound, setUserNotFound] = useState(false);

    // useEffect(() => {
    //     const fetchWalletAddress = async () => {
    //         try {
    //             if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    //                 const accounts = await window.ethereum.request({
    //                     method: "eth_requestAccounts",
    //                 });
    //                 const storedWalletAddress = accounts[0];
    //                 if (storedWalletAddress) {
    //                     setWalletAddress(storedWalletAddress);
    //                 }
    //             } else {
    //                 console.log("Ethereum is not installed");
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchWalletAddress();
    // }, []);

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                console.log('accounts:', accounts[0]);

                const res = await axios.post('http://localhost:8080/api/loginUser', {
                    eoa: accounts[0]
                });

                console.log('res:', res.data);
    
              
                // const provider = new ethers.BrowserProvider(window.ethereum);
                // const signer = provider.getSigner();
                // await provider.send("eth_requestAccounts", []);
            } catch (error) {
                console.error('Error while connecting wallet:', error);
                // Handle error while connecting wallet
            }
        } else {
            console.log("Ethereum is not installed");
            // Handle case when Ethereum is not installed
        }
    };
    

    return (
        <div>
            {walletAddress ? (
                <div>
                    <p>{walletAddress && `${walletAddress.slice(0, 3)}...${walletAddress.slice(-8)}`} </p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default ConnectWallet;
