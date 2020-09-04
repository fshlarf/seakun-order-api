const express = require('express')
const Established = require('../db')
const {GoogleSpreadsheet} = require('google-spreadsheet')
const credentials = require('../client_secret.json')
const { json } = require('body-parser')
const doc = new GoogleSpreadsheet('1HJDHVARMw-qIF6NYb5bVIGSFHvyh-LBIsJsSlOHlBHs')

const router = express.Router()

const isNotCompleted = (body) => {
    if (body.email === undefined || body.email === null || body.fullname === undefined || body.fullname === null) {
        return true
    }

    return false
}

router.get('/', (req, res, next) => {
    new Established().play((seakunConn) => {
        seakunConn.query('SELECT * FROM registration', async (err, rows, fields) => {
            seakunConn.end()

            if (!err) {
                const responseRows = await rows
                res.send(responseRows)
            } else {
                console.log(err)
            }
        })
    })
})

router.get('/group', async (req, res, next) => {
    let customers = []
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows()
    if (rows) {
        rows.forEach(row => {
            let customer = {
                'group': row._rawData[0],
                'customer_name': row._rawData[1],
                'customer_email': row._rawData[2],
                'provider': row._rawData[3]
            }
            customers.push(customer)
        })
    }
    res.send(customers)
})

router.delete('/:id', (req, res) => {
    new Established().play((seakunConn) => {
        seakunConn.query('DELETE FROM registration WHERE id = ?', [req.params.id], async (err, rows, fields) => {
            seakunConn.end()

            if (!err) {
                res.send('Deleted Successfully')
            } else {
                console.log(err)
            }
        })
    })
})

router.post('/', (req, res, next) => {
    new Established().play((seakunConn) => {
        if (isNotCompleted(req.body)) {
            res.send({
                code: 400,
                message: 'email or fullname not allowed empty',
                status: 'EMPTY_REQ_BODY',
                data: null
            })
        } else {
            seakunConn.query('INSERT INTO registration SET ?', req.body, (err, rows, fields) => {
                seakunConn.end()
    
                if (!err) {
                    let result = {
                        code: 200,
                        message: 'success',
                        status: rows,
                        data: null
                    }
                    res.send(result)
                }
                else {
                    res.send({
                        code: err.errno,
                        message: err.sqlMessage,
                        status: err.code,
                        data: null
                    })
                }
            })
        }
    })
})

module.exports = router