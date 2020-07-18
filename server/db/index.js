const mysql = require('mysql')

const seakunConn = mysql.createConnection({
    password: 'S34kUn1D@2020',
    user: 'u630538220_seakunid',
    database: 'u630538220_seakun_main',
    host: '185.224.137.8',
    port: '3306',
    multipleStatements: true
})

module.exports = seakunConn