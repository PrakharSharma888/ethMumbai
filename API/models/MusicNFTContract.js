const mongoose = require('mongoose')

const musicNFTContractSchema = new mongoose.Schema({
    trackName: {
        type: String,
        required: true
    },
    artistName:{
        type: String,
        required: true
    },
    albumName:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
})


const MusicNFTContract = mongoose.model('musicNFTContract', musicNFTContractSchema)
module.exports = MusicNFTContract