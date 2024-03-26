const express = require('express')
const TemplateRouter = express.Router()
const {getTemplates} = require('../controllers/templatesController')

TemplateRouter.get('/getAll', getTemplates)

module.exports = TemplateRouter