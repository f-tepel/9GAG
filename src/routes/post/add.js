const express = require('express')
const Post = require('../../classes/Post')
const router = express.Router()

router.post('/post', (req, res) => {
    let userId = req.body.userId
    let caption = req.body.caption
    let description = req.body.description
    let img =  req.body.img
    let post = new Post(userId, caption, description, img);

    (global).Post.insertOne(post)
    res.status(200).send('Added post successfully')
})

module.exports = router
