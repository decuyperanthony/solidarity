// imports
const jwt = require('jsonwebtoken');


const JWT_SIGN_SECRET = process.env.SECRET_SIGN_TOKEN;

// export
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            // mettre le rôle à terme
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '3h'
        })
    },
    verifyToken: function(token) {
        return jwt.verify(token, JWT_SIGN_SECRET);
    },
}