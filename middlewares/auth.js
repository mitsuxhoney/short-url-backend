const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const SECRET = process.env.SECRET;

const auth = async(req, res, next) => {

    try {

        const token = req.cookies?.jwt_token;

        if(!token) {
            req.user = null;
            next();
        }

        const decoded = await jwt.verify(token, SECRET);

        const id = decoded._doc._id;

        console.log(id);

        const user = await User.findById(id);

        console.log(user);

        if(!user) {
            req.user = null;
            next();
        }

        req.user = user;

        next();

    } catch (error) {

        req.user = null;
        next();

    }
    
}

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.redirect('/');
        }
        console.log("You are authorized to access this page");
        next();
    }
}
 
module.exports = {auth, authorize};