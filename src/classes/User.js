const ObjectId = require('mongodb').ObjectID
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')

class User {

    constructor(name, pwd) {
        this._id =  new ObjectId()
        this.email = name
        this.password = pwd
    }

    isUsed(res, callback) {
        global.UserDB.findOne(
            {email: this.email}, 
            (err, docs) => {
                if(docs) {
                    res.status(400).send('Email is already used');
                } else {
                    callback()
                }
            }
        )
    }

    isValid() {
        const valEmail = validator.isEmail(this.email)
        const valPwd = (this.password.length > 8)

        if(valEmail && valPwd) return true
        return false
    }

    setId(id) {
        this._id = id;
    }

    setEmail(email) {
        this.email =  email
    }

    setPassword(password) {
        // please hash before
        this.password = password
    }

    saveUser(callback) {
        let user = this;
        const token = user.generateAuthToken();
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                global.UserDB.insert(user);
                callback(token);
            });
        });              
    }

    generateAuthToken() {
        let user =  this;
        const access = 'auth';
        let token = jwt.sign({_id: user._id.toString(), access}, 'abc123').toString();
        user.tokens = [{access, token}];
        return token;
    }

    addAuthToken() {
        let user = this;
        (global).UserDB.update({
            email: user.email
        },
        {
            $push: {
                tokens: {
                    access: 'auth',
                    token: user.tokens[0].token
                }
            }
        })
    }

    static findByEmail(email, password, callback) {
        global.UserDB.findOne({
            email
        },
        (err, user) => {
            if(err || user === null) return callback(null);
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) return callback('error');
                if(res === false) {
                    return callback('error');
                } else {
                    return callback(user);
                }
            })
        })
    }

    static findByToken(token, callback) {
        let decoded;

        try {
            decoded = jwt.verify(token, 'abc123');
        } catch(e) {
            return callback('token not valid', null)
        }

        global.UserDB.findOne({
            '_id': ObjectId(decoded._id),
            'tokens.token': token,
            'tokens.access': 'auth' 
        },
        {
            email: 1
        },
        (err, user) => {
            if(err) {
                callback(err, null)
            } else {
                callback(null, user)
            }
        })
    }

    static pick(user) {
        return _.pick(user, ['_id', 'email'])
    }
}

module.exports = User