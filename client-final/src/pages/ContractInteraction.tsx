import React from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor';

const ContractInteraction = () => {
  let { id } = useParams();


  return (
    <div className='p-5 flex flex-col justify-around h-[90vh] gap-5'>
      {/* ID : {id} */}


      <div>
        <div className='text-2xl font-semibold'>
          Music Albums
        </div>
        <div className='text-sm text-gray-600'>
          THis is a contract description
        </div>
      </div>

      <div>
        Contract Information : ERC 721
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