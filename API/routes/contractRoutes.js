const express = require('express')
const ContractRouter = express.Router()
const {createContract, TestContract, SingleContract,getSingleSportsContract, getContracts,getSportsContracts, CreateMusicNFTContract, CreatSportsContract} = require('../controllers/contractController')


ContractRouter.get('/testContract', TestContract)
ContractRouter.post('/createContract', createContract)
ContractRouter.post('/getContracts', getContracts)
ContractRouter.get('/singleContract/:id', SingleContract)
ContractRouter.post('/createMusicNFTContract', CreateMusicNFTContract)
ContractRouter.post('/createSportsContract', CreatSportsContract)
ContractRouter.post('/getSportsContracts', getSportsContracts)
ContractRouter.get('/singleSportsContract/:id', getSingleSportsContract)



module.exports = ContractRouter