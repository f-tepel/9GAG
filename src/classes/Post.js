class Post {
    constructor(userId, section, caption, description, image){
        this.userId = userId
        this.date = new Date()
        this.section = section
        this.caption = caption
        this.description = description
        this.image = image
        this.likes = []
        this.disLikes = []
        this.comments = []
    }
}

module.exports =  Post