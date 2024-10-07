const express = require('express');
const viewRouter = express.Router();
const userAuth = require('../middlewares/userAuth');
const Url = require('../models/url');

viewRouter.get('/', userAuth, (req, res) => {
    if(req?.user) {
 
        res.render('dashboard');
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