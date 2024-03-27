const express = require('express')
const app = express()
const ConnectToDB = require('./utils/ConnectToDb')
const PORT = 8080
const bodyParser = require('body-parser')
const cors = require('cors')
const router  = require('./routes/userRoutes')
const TemplateRouter = require('./routes/templateRoutes')
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())

ConnectToDB()

app.use('/api', router)
app.use('/template', TemplateRouter)

app.listen(PORT, () => {
    console.log(`Listenign @ ${PORT}`)
})