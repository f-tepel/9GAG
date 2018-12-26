const ObjectId = require('mongodb').ObjectID

class Like {
    constructor(userId, like) {
        this.userId = userId
        this.like = like
    }

    insertLike() {
        global.PostDB.update({
            _id: ObjectId(this.userId)
        },
        {
            $push: {
                likes: this
            }
        })
    }

    insertDislike() {
        global.PostDB.update({
            _id: ObjectId(this.userId)
        },
        {
            $push: {
                dislikes: this
            }
        })
    }
}

module.exports = Like