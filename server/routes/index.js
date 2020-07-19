const express = require('express')
const Established = require('../db')

const router = express.Router()

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
        let user = req.body
        let sql = "SET @id = ?; SET @fullname = ?; SET @email = ?; SET @whatsapp = ?; SET @provider = ?; SET @packet = ?; SET @price = ?; \
        CALL AddRegisteredUser(@id,@fullname,@email,@whatsapp,@provider,@packet,@price);" 
        seakunConn.query(sql, [
            user.id, 
            user.fullname, 
            user.email, 
            user.whatsapp, 
            user.provider, 
            user.packet,
            user.price
        ], async (err, rows, fields) => {
            seakunConn.end()

            if (!err) {
                let result = {
                    code: 200,
                    message: '',
                    status: 'success',
                    data: null
                }
                const responseRows = await rows
                responseRows.forEach(element => {
                    if (element.constructor == Array) {
                        result.message = 'Inserted user id : ' +element[0].id
                        res.send(result)
                    }
                })
            }
            else {
                console.log(err)
                if (err.code == 'ER_DUP_ENTRY') {
                    res.send(err.msg = 'Error Duplicate Email')
                }
            }
        })
    })
})

module.exports = router