const Contract = require('../models/contractModel');
const MusicNFTContract = require('../models/MusicNFTContract');
const SportsNFTContract = require('../models/SportsNFTModel');

const TestContract = async (req, res) => {
    res.status(200).json({ message: "Contract Controller Works" });
}

const createContract = async (req, res) => {
    try {
        const contract = await Contract.create(req.body);
        res.status(201).json({ contract });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const CreateMusicNFTContract = async (req, res) => {
    try {
        const {trackName, artistName, userID, contractAddress} = req.body;
        const contract = await MusicNFTContract.create({trackName, artistName, userID, contractAddress});
        res.status(201).json({ 
            contract,
            message: "Music NFT Contract Created"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
}

const CreatSportsContract = async (req, res) => {
    try {
        const {SportsMName, sportsPlayed, achivement, yearOfExperiance, TokenName, TokenSymbol, userID, contractAddress} = req.body;
        const contract = await SportsNFTContract.create({SportsMName, sportsPlayed, achivement, yearOfExperiance, TokenName, TokenSymbol, userID, contractAddress});
        res.status(201).json({ 
            contract,
            message: "Sports NFT Contract Created"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
}

const getSportsContracts = async (req, res) => {
    try {
        const {userId} = req.body;
        const contracts = await SportsNFTContract.find({ userId: userId });
        res.status(200).json({ contracts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getSingleSportsContract = async (req, res) => {
    try {
        const contract = await SportsNFTContract.findById(req.params.id);
        res.status(200).json({ contract });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getContracts = async (req, res) => {
    try {
        const {userId} = req.body;
        const contracts = await MusicNFTContract.find({ userId: userId });
        res.status(200).json({ contracts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const SingleContract = async (req, res) => {
    try {
        const contract = await MusicNFTContract.findById(req.params.id);
        // console.log(req.params.id);
        res.status(200).json({ contract });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createContract, TestContract, SingleContract, getContracts,getSingleSportsContract, CreateMusicNFTContract, CreatSportsContract, getSportsContracts}