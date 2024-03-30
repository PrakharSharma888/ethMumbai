import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import { WalletMinimal } from 'lucide-react';




const ConnectWallet = () => {

    const navigate = useNavigate();

    const { eoa, setEoa, setSigner } = useContext(UserContext)
    const { user, setUser } = useContext(UserContext)


    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                setSigner(signer)
                const address = await signer.getAddress();
                // console.log("Provider --", address);
                // console.log('accounts:', accounts[0]);
                setEoa(address);
                // localStorage.setItem('eoa', accounts[0]);


                const res = await axios.post('http://localhost:8080/api/loginUser', {
                    eoa: address
                });
                setUser(res.data.user);

                if (res.data.status == 400) {
                    toast.success('User Not Found, Please Signup first'); // Not working ??
                    setTimeout(() => {
                        navigate('/signup', { state: { eoa: address } });
                    }, 500);
                }

                if (res.data.status == 200) {
                    toast.success('User logged in successfully');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error while connecting wallet:', error);
            }
        } else {
            console.log("Ethereum is not installed");
        }
    };

    // useEffect(() => {
    //   connectWallet()
    // }, []);


    return (
        <div>
            <Toaster />

            <button onClick={connectWallet} className='bg-white text-black border-[1px] border-white p-2 rounded-lg flex gap-2'>
                <WalletMinimal />
                <span> Connect Wallet </span>
            </button>

            {/* {eoa ? (
                <div>
                    <p>{eoa && `${eoa.slice(0, 3)}...${eoa.slice(-8)}`} </p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )} */}
        </div>
    );
}

export default ConnectWallet;
