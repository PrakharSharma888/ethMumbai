const express = require('express')
const app = express()
const ConnectToDB = require('./utils/ConnectToDb')
const PORT = 8080
const bodyParser = require('body-parser')
const UserModel = require('./models/UserModel')


//MongoDb Connect 
ConnectToDB()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        "message": "Sab Bdiya Chl rha h"
    }).status(200)
})

app.post('/createUser', (req, res) => {
    const {name, email, walletAddress} = req.body
    const user = new UserModel({
        name,
        email,
        walletAddress
    })
    user.save().then(() => {
        res.json({
            "message": "User Created"
        }).status(200)
    }).catch((err) => {
        res.json({
            "message": "Error"
        }).status(500)
    })
})

app.get('/getAllUsers', (req, res) => {
    UserModel.find().then((users) => {
        res.json({
            "users": users
        }).status(200)
    }).catch((err) => {
        res.json({
            "message": "Error"
        }).status(500)
    })

})

app.listen(PORT, () => {
    console.log(`Listenign @ ${PORT}`)
})