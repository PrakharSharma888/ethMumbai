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
import Logo from '../assets/final_logo.png'
import { CirclePlus } from 'lucide-react';


declare global {
    interface Window { ethereum: any; }
}

const Navbar = () => {

    const { eoa, setEoa, user, LogOut, balance, provider } = useContext(UserContext)
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();


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
        <div className='flex justify-between px-10 py-4 items-center bg-black text-white'>
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
                    <div className='flex  gap-3 items-center'>
                        <div className='flex gap-3 bg-white text-black p-3 rounded-lg'>
                            <div>
                                10 ETH
                            </div>

                            <div className='' onClick={()=>alert('Add FUnds')}>
                                <CirclePlus/>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-3 bg-white text-black px-2 p-1 rounded-lg border-[1px] border-black' onClick={toggleProfile}>
                                <img className='h-10 w-10 rounded-full cursor-pointer' src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg' alt='err' />
                                <div>Hi {user.name}</div>
                            </div>
                            {
                                showProfile && (
                                    <div className='absolute right-5 text-black bg-white mt-3 mr-4 p-1 rounded-lg'>
                                        <div className='flex flex-col gap-3 py-'>
                                            <span> {user._id} </span>
                                            <span> {user.email} </span>
                                            <span> {user.eoa}</span>
                                        </div>
                                        <button className='bg-black text-white w-full rounded-xl py-2' onClick={handleLogout}> Sign Out </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                ) : (
                    <ConnectWallet />
                )}
            </div>

        </div >
    )
}
export default Navbar