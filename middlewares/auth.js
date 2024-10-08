const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

const auth = async(req, res, next) => {

    try {

        const token = req.cookies?.jwt_token;

        const user = await jwt.verify(token, SECRET);

        req.user = user;

        next();

    } catch (error) {

        req.user = null;
        next();

    }
    
}

module.exports = auth;