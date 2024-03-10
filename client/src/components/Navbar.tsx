import React from 'react'

const Navbar = () => {
  return (
    <div className='flex px-10 py-2 bg-black text-w justify-between items-center'>
        <div>
            ethMumbai
        </div>

        <div>
            <ul className='flex gap-4'>
                <li>something...</li>
                <li>something...</li>
                <li>something...</li>
            </ul>
        </div>

        <div>
            <button>Connect Wallet</button>
        </div>
    </div>
  )
}

export default Navbar