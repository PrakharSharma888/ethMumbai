const express = require('express')
const ContractRouter = express.Router()
const {createContract, TestContract, SingleContract, getContracts} = require('../controllers/contractController')


ContractRouter.get('/testContract', TestContract)
ContractRouter.post('/createContract', createContract)
ContractRouter.post('/getContracts', getContracts)
ContractRouter.get('/singleContract/:id', SingleContract)

module.exports = ContractRouter