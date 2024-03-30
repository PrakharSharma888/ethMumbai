const mongoose = require('mongoose')

const musicNFTContractSchema = new mongoose.Schema({
    trackName: {
        type: String,
    },
    artistName:{
        type: String,
    },
    // albumName:{
    //     type: String,
    //     required: true
    // },
    // genre:{
    //     type: String,
    //     required: true
    // },
    // year:{
    //     type: String,
    //     required: true
    // },
    userID:{
        type: String,
    },
    contractAddress:{
        type: String,
    },
})


const MusicNFTContract = mongoose.model('musicNFTContract', musicNFTContractSchema)
module.exports = MusicNFTContract