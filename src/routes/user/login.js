const express = require('express')
const router = express.Router()

router.post('/user/login', (req, res) => {
    let name = req.body.name
    let pwd = req.body.pwd;

    (global).User.findOne({
        name,
        pwd
    }, { _id: 1}, (err, docs) => {
        if(docs) {
            res.status(200).send('success')
        } else {
            res.status(404).send('not found')
        }
    })
})

module.exports = router