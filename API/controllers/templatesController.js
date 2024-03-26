const Template = require('../models/templateModel')

const getTemplates = async (req, res) => {
    const allTemplates = await Template.find()

    res.json({
        allTemplates
    })
}

const createTemplate = async (req, res) => {
    res.json({
        msg: "Template Bna lo"
    })
}

module.exports = {getTemplates, createTemplate}