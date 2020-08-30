const express = require('express')
const apiRouter = require('./routes')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
app.use(cors())

app.use(express.json())

app.use(bodyParser.json({ type: "application/*+json" }))

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/registered-user', apiRouter)

app.listen(process.env.PORT || '4000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '4000'}`);
})