import React from 'react'
import { useParams } from 'react-router-dom'
import NFT from '../components/contracts/NFT'
import Token from '../components/contracts/Token'

const CreateContract = () => {
    const { type } = useParams()

    let componentToRender;
    if (type === 'nft') {
        componentToRender = <NFT />
    } else if (type === 'token') {
        componentToRender = <Token />
    }


    return (
        <div>
            <div>
                CreateContract : {type}
            </div>

            <div>
                {componentToRender}
            </div>
        </div>
    )
}

export default CreateContract