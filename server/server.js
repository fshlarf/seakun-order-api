const express = require('express')
const apiRouter = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

pp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://seakun.id');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())

app.use('/registered-user', apiRouter)

app.listen(process.env.PORT || '4000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '4000'}`);
})