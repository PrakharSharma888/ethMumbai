import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';

const ContractInteraction = () => {
  let { id } = useParams();
  const [contractData, setContractData] = useState({})

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/contract/singleContract/${id}`);
        setContractData(response.data.contract);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchContractData();
  }, [id])

  console.log('Contract Data:', contractData);

  return (
    <div className='p-5 flex flex-col justify-around h-[90vh] gap-5 mt-40'>
      ID : {id}


      <div>
        <div className='text-2xl font-semibold'>
          Artist : {contractData.artistName}
        </div>
        <div className='text-sm text-gray-600'>
          Track Name : {contractData.trackName}
        </div>
      </div>

      <div>
        <div className='text-2xl font-semibold'>
          Contract Address : {contractData.contractAddress}
        </div>
        <div className='text-sm text-gray-600'>
          Contract Name : {contractData.userID}
        </div>
      </div>

      <div className='px-5 grid grid-cols-3 gap-5 h-1/2'>
        <div className='bg-gray-100 h-full rounded-xl flex flex-col justify-center items-center gap-4'>

          <span className='text-xl font-bold'> Transfer </span>
          <div className='flex flex-col items-center mb-2'>
            <label htmlFor='amount' className='mb-1'>Amount in ETH:</label>
            <input type='number' id='amount' className='border border-gray-300 rounded-md p-1 w-full' />
          </div>

          <div className='flex flex-col items-center'>
            <label htmlFor='recipient' className='mb-1 '>Send to:</label>
            <input type='text' id='recipient' className='border border-gray-300 rounded-md p-1' />
          </div>

          <button className='bg-black text-white w-1/2 py-3 rounded-lg'> Send </button>
        </div>

        <div className='bg-gray-100 flex justify-center h-full items-center rounded-xl'>
          Mint
        </div>

        <div className='bg-gray-100 flex justify-center h-full items-center rounded-xl'>
          Burn
        </div>
      </div>

      <div>
        <CodeEditor />
      </div>

    </div>
  )
}

export default ContractInteraction