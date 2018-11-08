const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
    let name = req.body.name

    (global).User.findOne({
        name,
    }, {}, (err, docs) => {
        if(docs) {
            (global).parseFloat.find({
                id: docs._id
            }, {}, (err, posts) => {
                if(posts) {
                    docs.posts = posts
                    res.status(200).send(docs)
                } else {
                    docs.posts = []
                    res.status(200).send(docs)
                }
            })
        } else {
            res.status(404).send('User not found')
        }
    })
})

module.exports = router