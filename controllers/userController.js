const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

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
            httpOnly: true
        });

        res.redirect('/dashboard');
        
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
            password,
            profileUrl: ""
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

const handleProfileImageUpload = async(req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Upload the file from local storage to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'profileImage',
            resource_type: 'auto', // Automatically determine resource type
            transformation: [
                {
                    width: 30,        // Desired width
                    height: 30,       // Desired height
                    crop: 'thumb',      // Crop to a thumbnail
                    gravity: 'face',    // Focus on the face when cropping
                    radius: 'max',      // Create a circular crop
                    format: 'png',      // Save as PNG to retain transparency
                },
            ]
        });

        // Optionally, delete the file from local storage after uploading
        fs.unlinkSync(req.file.path);

        await User.findByIdAndUpdate({ _id: req.user._id }, {$set: {profileUrl: result.secure_url}});

        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        fs.unlinkSync(req.file.path);
        res.status(500).json({ error: 'Error uploading file to Cloudinary' });
    }
};


module.exports = {handleLogin, handleSignup, handleLogout, handleProfileImageUpload};