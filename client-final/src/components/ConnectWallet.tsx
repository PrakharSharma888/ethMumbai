import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import UserContext from '../context/userContext.js';




const ConnectWallet = () => {

    const navigate = useNavigate();

    const {eoa, setEoa} = useContext(UserContext)
    const {user, setUser} = useContext(UserContext)

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                // console.log('accounts:', accounts[0]);
                setEoa(accounts[0]);
                // localStorage.setItem('eoa', accounts[0]);


                const res = await axios.post('http://localhost:8080/api/loginUser', {
                    eoa: accounts[0]
                });

                console.log('HEre')

                console.log('res:', res);
                // setUser(res.data.user);

                if (res.data.status == 400) {
                    toast.success('User Not Found, Please Signup first'); // Not working ??
                    setTimeout(() => {
                        navigate('/signup', { state: { eoa: accounts[0] } });
                    }, 1000);
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

            <button onClick={connectWallet}>Connect Wallet</button>

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
