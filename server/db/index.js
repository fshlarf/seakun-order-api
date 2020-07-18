const mysql = require('mysql')

const seakunConn = mysql.createConnection({
    password: 'root',
    user: 'root',
    database: 'seakundb',
    host: 'localhost',
    port: '3306',
    multipleStatements: true
})

module.exports = seakunConn