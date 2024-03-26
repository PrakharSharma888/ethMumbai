const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')

const authMiddleware = (req, res, next) => {
    console.log('Auth Middleware')
    next()
}

module.exports = authMiddleware