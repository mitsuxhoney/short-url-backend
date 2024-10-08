const express = require('express');
const viewRouter = express.Router();
const {auth, authorize} = require('../middlewares/auth');
const Url = require('../models/url');

viewRouter.get('/', auth, async(req, res) => {
    if(req.user) {
       return res.redirect('/dashboard'); 
    }
    return res.render('home');

});

viewRouter.get('/admin/dashboard', auth, authorize(["admin"]), async(req, res) => {
    try{
        const urls = await Url.find().populate('createdBy', 'username email');
        res.render('adminDashboard', {
            urls: urls,
            username: req.user._doc.username
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
})

viewRouter.get('/dashboard', auth, authorize(["user", "admin"]), async(req, res) => {
    const urls = await Url.find({createdBy: req.user._doc._id});
        res.render('dashboard', {
            urls: urls,
            username: req.user._doc.username,
            role: req.user._doc.role    
        });
        return;
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