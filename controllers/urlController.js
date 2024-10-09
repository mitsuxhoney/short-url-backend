const shortid = require('shortid');
const Url = require('../models/url');

const handleGenerateUrl = async(req, res) => {

    try {

        const {url} = req.body;

        const checkIfUrlExists = await Url.findOne({redirect_url: url, createdBy: req.user._doc._id});

        if(checkIfUrlExists) {
            return res.json({
                message: 'URL already exists for this user.'
            });
        }

        const short_id = shortid.generate();

        await Url.create({
            short_id: short_id,
            redirect_url: url,
            analytics: [],
            createdBy: [req.user._doc._id]
        });

        res.redirect('/');



    } catch (error) {
        res.redirect('/');
    }

    

};

const handleRedirectToUrlById = async(req, res) => {

    try {
        const id = req.params.id;
    
        const url = await Url.findOne({short_id: id, createdBy: req.user._doc._id});

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
        res.redirect('/');
    }
    
};

const handleDeleteUrlById = async(req, res) => {


    const {id: short_id} = req.params;

    await Url.findOneAndDelete({short_id: short_id, createdBy: req.user._doc._id});

    res.redirect('/');


};

module.exports = {handleGenerateUrl, handleRedirectToUrlById, handleDeleteUrlById};