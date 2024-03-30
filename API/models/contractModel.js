const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
    contractType : {
        type: String,
        required: true
    },
    functionName:{
        type: String,
        required: true
    },
    tokenName:{
        type: String,
        required: true
    },
    tokenSymbol:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    
})

const Contract = mongoose.model('contract', contractSchema)
module.exports = Contract