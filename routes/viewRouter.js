const express = require('express');
const viewRouter = express.Router();
const userAuth = require('../middlewares/auth');
const Url = require('../models/url');

viewRouter.get('/', userAuth, async(req, res) => {
    if(req?.user) {
        const urls = await Url.find({createdBy: req.user._doc._id});
        res.render('dashboard', {
            urls: urls,
            username: req.user._doc.username
        });
        return;
    }
    res.render('home');
});

viewRouter.get('/auth/login', userAuth, (req, res) => {
    if(req?.user) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

viewRouter.get('/auth/signup', userAuth, (req, res) => {
    if(req?.user) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = viewRouter;