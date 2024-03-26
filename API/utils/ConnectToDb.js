const mongoose = require('mongoose')

const ConnectToDB = () => {
    mongoose.connect('mongodb+srv://kmalik0907:AgXv6puB80xR3XRw@cluster0.t0lpufo.mongodb.net').then(
        () => {console.log('DB Connected')}
    ).catch((err) => {
        console.log(err)
    })
}

module.exports = ConnectToDB
