const { User } = require('../classes/User');
const bodyParser = require('body-parser');

let login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email, password, (docs) => {
        if(docs === null) {
            res.status(404).send();
        } else if (docs === 'error') {
            res.status(401).send();
        } else {
            let user = new User(docs.email, docs.password);
            user.setId(docs._id);
            req.user =  user;
            if(user.tokens === undefined) {
                req.token = user.generateAuthToken();
                user.addAuthToken();
            } else {
                req.token = user.tokens[0].token
            }
            next();
        }
    })
}

module.exports = login
