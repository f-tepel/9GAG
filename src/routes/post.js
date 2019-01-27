const authenticate = require( '../middleware/authenticate');
const express = require('express')
const router = express.Router()
const Post = require('../classes/Post')
const Like = require('../classes/Feedback')
const Comment = require('../classes/Comment')
const ObjectId = require('mongodb').ObjectID

router.post('/api/post', authenticate, (req, res) => {
    let caption = req.body.caption
    let section = req.body.section
    let post = new Post(req.user._id, section, caption, 'desc', req.body.image);
    global.PostDB.insert(post)
    res.status(200).send('Added post successfully')
})

router.delete('/api/post', authenticate, authenticate, (req, res) => {
    let id = req.body.id;
    global.PostDB.findOne({
        _id: id
    }, {_id: 1}, (err, docs) => {
        if(err) {
            res.send(404).send('Post not found')
        }
        global.PostDB.deleteOne({
            _id: id
        })
        res.status(200).send('user deleted successfully')
    })
})

router.get('/api/post/all', authenticate, (req, res) => {
    global.PostDB.find({}).toArray((err, docs) => {
        if(err) return res.status(404).send(err)
        return res.send(docs)
    })
})

router.get('/api/post/:id', authenticate, (req, res) => {
    let id = req.params.id
    global.PostDB.findOne({
        _id: ObjectId(id)
    }, (err, post) => {
        if(err) return res.status(404).send()
        return res.send(post)
    })
})

router.get('/api/like/:id', authenticate, (req, res) => {
    let postId = req.params.id
    let userId = req.user._id
    let like = new Like(postId, userId)
    like.isLiked((liked) => {
        if(liked) {
            res.send(JSON.stringify({
                success: false
            }))
        } else {
            like.isDisliked((liked) => {
                if(liked) like.removeDislike()
                like.insertLike()
                res.send(JSON.stringify({
                    success: true,
                    removed: liked
                }))
            })
        }
    })
})

router.get('/api/dislike/:id', authenticate, (req, res) => {
    let postId = req.params.id
    let userId = req.user._id
    let like = new Like(postId, userId)
    like.isDisliked((liked) => {
        if(liked) {
            res.send(JSON.stringify({
                success: false
            }))
        } else {
            like.isLiked((liked) => {
                if(liked) like.removeLike()
                like.insertDislike()
                res.send(JSON.stringify({
                    success: true,
                    removed: liked
                }))
            })
        }
    })
})

router.post('/api/comment', authenticate, (req, res) => {
    let postId = req.body.id
    let userId = req.user._id
    let text = req.body.text
    let comment = new Comment(text, userId, req.user.name)
    comment.insertComment(postId)
    res.send('success')
})

module.exports = router