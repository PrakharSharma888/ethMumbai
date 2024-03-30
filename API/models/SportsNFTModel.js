const mongoose = require('mongoose');

const SportsNFTSchema = new mongoose.Schema({
    SportsMName:{
        type: String,
        required: true
    },
    sportsPlayed:{
        type: String,
        required: true
    },
    achivement:{
        type: String,
        required: true
    },
    yearOfExperiance:{
        type: String,
        required: true
    },
    TokenName:{
        type: String,
        required: true
    },
    TokenSymbol:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    type:{
        type: String,
        default: "SportsNFT"
    },
    contractAddress:{
        type: String,
        required: true
    },
});

const SportsNFTContract = mongoose.model('SportsNFTContract', SportsNFTSchema);
module.exports = SportsNFTContract;