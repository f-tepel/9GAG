const login = require( "../middleware/login");
const authenticate = require( '../middleware/authenticate');
const User = require('../classes/User');
const Post = require('../classes/Post');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.post('/api/user/register', (req, res) => {
    const email = req.body.email;
    const name = req.body.username;
    const password = req.body.password;

    let user = new User(email, name, password);
    user.isUsed(res, () => {
        if(user.isValid()){
            user.saveUser((token) => {
                res.header({
                    'x-auth': token,
                    'Access-Control-Expose-Headers': 'x-auth'
                }).send(User.pick(user));
            })
        } else {
            res.status(400).send('Email password is not correct');
        }
    })
})

router.post('/api/user/login', login, (req, res) => {
    res.status(200).header({
        'x-auth': req.token,
        'Access-Control-Expose-Headers': 'x-auth'
    }).send(User.pick(req.user));
})

router.post('/api/user/profile', authenticate, (req, res) => {
    let name = req.body.name;

    (global).User.findOne({
        name,
    }, {}, (err, docs) => {
        if(docs) {
            (global).Post.find({
                id: docs._id
            }).toArray( (err, posts) => {
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

router.delete('/user', (req, res) => {
    let name = req.body.name;

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

router.get('/api/user/logout', authenticate, (req, res) => {
    global.UserDB.update({
        email: req.user.email
    },
    {
        $unset: {
            tokens: []
        }
    })
    res.send()
})

router.get('/api/user/profile', authenticate, (req, res) => {
    Post.getPostByUser(req.user, (user, post) => {
        res.send({
            user,
            post
        })
    })
})

router.post('/api/user/password', authenticate, (req, res) => {
    let user = req.user
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword
    User.findByEmail(user.email, oldPassword, (user) => {
        if(user) {
            User.setPassword(user._id, newPassword)
            res.send()
        } else {
            res.status(401).send()
        }
    })
})

module.exports = router