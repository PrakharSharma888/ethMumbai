const Contract = require('../models/contractModel');

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

module.exports = {createContract, TestContract, SingleContract, getContracts}