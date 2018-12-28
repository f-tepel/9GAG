const ObjectId = require('mongodb').ObjectID

class Like {
    constructor(postId, userId) {
        this.postId = postId
        this.userId = userId
    }

    isLiked(callback) {
        global.PostDB.findOne({
            likes: {
                postId: this.postId,
                userId: ObjectId(this.userId)
            }
        }, (err, post) => {
            if(err || post == null) return callback(false)
            return callback(true)
        })
    }

    isDisliked(callback) {
        global.PostDB.findOne({
            dislikes: {
                postId: this.postId,
                userId: ObjectId(this.userId)
            }
        }, (err, post) => {
            if(err || post == null) return callback(false)
            return callback(true)
        })
    }

    insertLike() {
        global.PostDB.update({
            _id: ObjectId(this.postId)
        },
        {
            $push: {
                likes: this
            }
        })
    }

    insertDislike() {
        global.PostDB.update({
            _id: ObjectId(this.postId)
        },
        {
            $push: {
                dislikes: this
            }
        })
    }

    removeLike() {
        global.PostDB.update({
            _id: ObjectId(this.postId)
        },
        {
            $pull: {
                likes: {
                    postId: this.postId,
                    userId: ObjectId(this.userId)
                }
            }
        },
        { 
            multi: true
        })
    }

    removeDislike() {
        global.PostDB.update({
            _id: ObjectId(this.postId)
        },
        {
            $pull: {
                dislikes: {
                    postId: this.postId,
                    userId: ObjectId(this.userId)
                }
            }
        },
        { 
            multi: true
        }
        )
    }
}

module.exports = Like