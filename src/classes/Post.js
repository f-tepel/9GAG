class Post {
    constructor(userId, caption, description, image){
        this.userId = userId
        this.caption = caption
        this.description = description
        this.image = image
        this.likes = []
        this.comments = []
    }
}

module.exports =  Post