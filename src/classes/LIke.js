export class Like {
    _id
    userId
    like

    constructor(userId, like) {
        this.userId = userId
        this.like = like
    }
}