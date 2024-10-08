const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

const handleLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email ||!password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = await jwt.sign({
            ...user
        }, secret);

        res.cookie("jwt_token", token, {
            expires: new Date(Date.now() + 180000),
            httpOnly: true
        });

        res.redirect('/');
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const handleSignup = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(username, email, password);

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ message: 'User already exists with that email' });
        }

        await User.create({
            username,
            email,
            password
        });

        res.redirect('/auth/login');

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};


const handleLogout = (req, res) => {
    res.clearCookie("jwt_token");
    res.redirect('/');
};


module.exports = {handleLogin, handleSignup, handleLogout};