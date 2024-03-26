const express = require('express')
const router = express.Router()
const { UserTest, CreateUser, UserData, LoginUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/AuthMiddleware')


router.get('/testroute', UserTest)
router.post('/createUser', CreateUser)
router.post('/loginUser', LoginUser)
router.get('/userData', UserData)

module.exports = router