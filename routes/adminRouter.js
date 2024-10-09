const express = require('express');
const Url = require('../models/url');

const {auth, authorize} = require("../middlewares/auth");

const adminRouter = express.Router();

adminRouter.route('/:id').post(auth, authorize(["admin"]), async(req, res) => {
    try{
        const short_id = req.params.id;

        await Url.findOneAndDelete({short_id: short_id});

        res.redirect('/admin/dashboard');
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
}).get(auth, authorize(["admin"]), async(req, res) => {

        try {
            const id = req.params.id;
        
            const url = await Url.findOne({short_id: id});
    
            if(!url) {
                return res.json(404).json({
                    message: 'URL not found.'
                });
            }
    
            url.analytics.push({
                timestamp: new Date(),
            });
    
            await url.save();
    
            res.redirect(url.redirect_url);
    
        } catch (error) {
            console.log("error", error);
            res.redirect('/admin/dashboard');
        }
        
    });


module.exports = adminRouter;