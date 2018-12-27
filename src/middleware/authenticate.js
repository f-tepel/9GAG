const User = require("../classes/User");

let authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    User.findByToken(token, (err, user) => {
        if (err || user === null) {
            return res.status(401).send();
        }
        req.user = user;
        req.token = token;
        next();
    })
}

module.exports = authenticate