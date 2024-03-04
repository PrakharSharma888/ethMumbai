const express = require('express')
const app = express()
const ConnectToDB = require('./utils/ConnectToDb')
const PORT = 8080

//MongoDb Connect 
ConnectToDB()

app.get('/', (req, res)=>{
    res.json({
        "message" : "Sab Bdiya Chl rha h"
    }).status(200)
})

app.listen(PORT, ()=>{
    console.log(`Listenign @ ${PORT}`)
})