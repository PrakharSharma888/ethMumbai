import React from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, parseUnits } from "ethers";
import ConnectWallet from './ConnectWallet';
import { useContext } from 'react';
import UserContext from '../context/userContext.js';
import toast, { Toaster } from 'react-hot-toast';
import Logo from '../assets/main_logo.png'


declare global {
    interface Window { ethereum: any; }
}

const Navbar = () => {

    const { eoa, setEoa, user, LogOut } = useContext(UserContext)
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('From nav', user)
    }, [])

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    }

    const handleLogout = () => {
        toast.success('User logged out successfully');
        setTimeout(() => {
            LogOut()

        }, 500)
        navigate('/')

    }
    return (
        <div className='flex justify-between px-10 py-4 shadow-md items-center'>
            <Link to={'/'}>
                <img src={Logo} alt='logo' className='h-8' />
            </Link>

            {
                user && (
                    <>
                        <Link to={'/dashboard'}>
                            Dashboard
                        </Link>
                    </>
                )
            }


            <div>
                {user ? (
                    <div className=''>
                        <div className='flex items-center gap-5 bg-slate-200 p-1 rounded-lg border-[1px] border-black' onClick={toggleProfile}>
                            <img className='h-10 w-10 rounded-full cursor-pointer' src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg' alt='err' />
                            <div>Hi {user.smartWalletAddress}</div>
                        </div>
                        {
                            showProfile && (
                                <div className='absolute right-5 bg-black text-white mt-3 mr-4'>
                                    <div className='flex flex-col'>
                                        <span> {user._id} </span>
                                        <span> {user.email} </span>
                                        <span> {user.eoa}</span>
                                    </div>
                                    <button className='bg-red-600 w-full' onClick={handleLogout}> Sign Out </button>
                                </div>
                            )
                        }
                    </div>

                ) : (
                    <ConnectWallet />
                )}
            </div>

        </div >
    )
}
export default Navbar