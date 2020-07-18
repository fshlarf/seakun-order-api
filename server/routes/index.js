const express = require('express')
const seakunConn = require('../db')

const router = express.Router()

seakunConn.connect((err) => {
    if (!err)
    console.log('DB connection succeded')
    else
    console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2))
})

router.get('/', (req, res, next) => {
    seakunConn.query('SELECT * FROM seakundb.registration', (err, rows, fields) => {
        if (!err)
        res.send(rows)
        else
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    seakunConn.query('DELETE FROM seakundb.registration WHERE id = ?', [req.params.id] , (err, rows, fields) => {
        if (!err)
        res.send('Deleted Successfully')
        else
        console.log(err)
    })
})

router.post('/', (req, res, next) => {
    let user = req.body
    let sql = "SET @id = ?; SET @fullname = ?; SET @email = ?; SET @whatsapp = ?; SET @provider = ?; SET @packet = ?; \
    CALL AddRegisteredUser(@id,@fullname,@email,@whatsapp,@provider, @packet);" 
    seakunConn.query(sql, [
        user.id, 
        user.fullname, 
        user.email, 
        user.whatsapp, 
        user.provider, 
        user.packet
    ], (err, rows, fields) => {
        if (!err) {
            rows.forEach(element => {
                if (element.constructor == Array)
                res.send('Inserted user id : ' +element[0].id)
            });
        }
        else {
            console.log(err)
            if (err.code == 'ER_DUP_ENTRY') {
                res.send(err.msg = 'Error Duplicate Email')
            }
        }
    })
})

module.exports = router