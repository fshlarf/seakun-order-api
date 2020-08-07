const express = require('express')
const apiRouter = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

app.use('/registered-user', apiRouter)

app.listen(process.env.PORT || '4000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '4000'}`);
})