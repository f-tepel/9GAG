const express = require('express')
const router = express.Router()

router.post('/user/register', (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd;

    (global).User.findOne({
        name,
        pwd
    }, { _id: 1}, (err, docs) => {
        if(docs) {
            res.status(400).send('exists')
        } else {
            (global).User.insertOne({
                name,
                pwd
            })
            res.status(200).send('Added User')
        }
    })
})

module.exports = router