const express = require('express')
const router = express.Router()

router.delete('/user', (req, res) => {
    let name = req.body.name

    (global).User.findOne({
        name
    }, {_id: 1}, (err, docs) => {
        if(err) {
            res.send(404).send('User not found')
        }
        (global).User.deleteOne({
            _id: docs._id
        })
        res.status(200).send('user deleted successfully')
    })
})

module.exports = router