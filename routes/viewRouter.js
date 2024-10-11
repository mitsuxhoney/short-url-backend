const express = require('express');
const viewRouter = express.Router();
const {auth, authorize} = require('../middlewares/auth');
const Url = require('../models/url');

viewRouter.get('/', auth, async(req, res) => {
    if(req.user){
        return res.redirect('/dashboard');
    }
    return res.render('home');
});

viewRouter.get('/admin/dashboard', auth, authorize(["admin"]), async(req, res) => {
    try{
        const urls = await Url.find().populate('createdBy', 'username profileUrl');
        console.log(urls);
        res.render('adminDashboard', {
            urls: urls,
            username: req.user.username
        });
    }
    catch(error){
        console.error(error);
        return res.render('home');
    }
})

viewRouter.get('/dashboard', auth, authorize(["user", "admin"]), async(req, res) => {

    try {
        const urls = await Url.find({createdBy: req.user._id});
    
        return res.render('dashboard', {
            urls: urls,
            profileImage: req.user.profileUrl,
            username: req.user.username,
            role: req.user.role    
        });

    } catch (error) {
        console.log(error)
        return res.render('home');
    }
    
})

viewRouter.get('/auth/login', auth, (req, res) => {
    if(req?.user) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

viewRouter.get('/auth/signup', auth, (req, res) => {
    if(req?.user) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = viewRouter;