import React from 'react';
import bg_img from '../assets/bg_main.png'

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${bg_img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className='flex flex-col gap-3'>
        <div className=' flex justify-center'>
          <span className='border-[1px] border-[#B58AFF] text-[#B58AFF] py-1 px-2 rounded-full'>
            Create, Customize, Audit and Deploy
          </span>
        </div>
        <div className='text-7xl font-bold text-white text-center'>
          Instantly generate, <br />
          Smart Contracts
        </div>
        <div className='text-center text-white text-lg'>
          Effortless Smart Contract Creation for Web3 Pioneers. <br /> Elevate Your Blockchain Journey with SecureScript
        </div>
        <div className='flex justify-center gap-3 pt-4'>
          <button className='bg-white p-2 rounded-lg'> Connect Wallet </button>
          <button className='text-white border-[1px] border-white rounded-lg p-2'> Explore Contracts </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
