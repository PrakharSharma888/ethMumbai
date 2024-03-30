import React from 'react'
import { useParams } from 'react-router-dom'
import NFT from '../components/contracts/NFT'
import Token from '../components/contracts/Token'
import SportsAchivement from '../components/contracts/SportsAchivement'

const CreateContract = () => {
    const { type } = useParams()

    let componentToRender;
    if (type === 'nft') {
        componentToRender = <NFT />
    } else if (type === 'token') {
        componentToRender = <Token />
    } else if (type === 'sports') {
        componentToRender = <SportsAchivement />
    }


    return (
        <div className='flex bg-black h-fit items-center pb-10'>
            {/* <div>
                CreateContract : {type}
            </div> */}

            <div className='w-full h-full'>
                {componentToRender}
            </div>
        </div>
    )
}

export default CreateContract