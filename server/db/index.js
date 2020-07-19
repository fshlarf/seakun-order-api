const dotenv = require("dotenv")
const mysql = require('mysql')

module.exports = class Established {
    constructor () {
        this.seakunConn = {}
    }

    async setEnv () {
        dotenv.config()

        return 1
    }

    async setConnection () {
        this.seakunConn = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME
        })

        return 1
    }

    async startConnection () {
        this.seakunConn.connect(function(err) {
            if (err) throw err
        })

        return 1
    }

    async endConnection () {
        this.seakunConn.end()

        return 1
    }

    async setQuery (callback) {
        callback(this.seakunConn)

        return 1
    }

    async play (callback) {
        this.setEnv()
        .then(() => {
            this.setConnection()
        })
        .then(() => {
            this.startConnection()
        })
        .then(() => {
            this.setQuery(callback)
        })

        return 1
    }
}