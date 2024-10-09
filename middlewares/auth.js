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

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user._doc.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        console.log("You are authorized to access this page");
        next();
    }
}
 
module.exports = {auth, authorize};