const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true
    },
    templateDescription: {
        type: String,
        required: true
    },
    contractType:{
        type: String,
        required: true
    }
})

const Template = mongoose.model('template', templateSchema)
module.exports = Template