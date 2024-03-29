const Contract = require('../models/contractModel');
const MusicNFTContract = require('../models/MusicNFTContract');

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
        const {trackName, artistName, albumName, genre, year, userId} = req.body;
        res.status(201).json({ trackName, artistName, albumName, genre, year, userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
}

const getContracts = async (req, res) => {
    try {
        const {userId} = req.body;
        console.log(userId);
        const contracts = await Contract.find({ userId: userId });
        res.status(200).json({ contracts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const SingleContract = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        res.status(200).json({ contract });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createContract, TestContract, SingleContract, getContracts, CreateMusicNFTContract}