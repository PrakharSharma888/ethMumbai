import React from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, parseUnits } from "ethers";
import ConnectWallet from './ConnectWallet';


declare global {
    interface Window { ethereum: any; }
}

const Navbar = () => {

    const [walletAddress, setWalletAddress] = useState('')
    console.log('ddd' ,walletAddress);
    return (
        <div className='flex justify-between px-10 py-4 shadow-md items-center'>
            <Link to={'/'}>
                Keshav Malik
            </Link>

        
            <div>
                {walletAddress ? (
                    <div className='flex items-center gap-5'>
                        <img className='h-10 w-10 rounded-full cursor-pointer' src='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg' alt='err' />
                        <div> Keshav Malik </div>
                    </div>
                ) : (
                    // Render ConnectWallet component passing setWalletAddress as prop
                    <ConnectWallet setWalletAddress={setWalletAddress}/>
                )}
            </div>

        </div >
    )
}
export default Navbar