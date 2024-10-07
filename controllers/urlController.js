const shortid = require('shortid');
const Url = require('../models/url');

const handleGenerateUrl = async(req, res) => {

    try {
        const {url} = req.body;
        
        console.log(url);

        if(!url) {
            res.json(400).json({
                message: 'Please provide a valid URL.'
            });
        }

        let checkUrl = await Url.findOne({redirect_url: url});

        if(checkUrl) {
            if(!checkUrl.createdBy.includes(req.user._id)) {
                checkUrl.createdBy.push(req.user._id);
                await checkUrl.save();
                return res.redirect('/');
            }
        }

        console.log(req.user?._id);

        await Url.create({
            short_id: req.user._id,
            redirect_url: url,
            analytics: [],
            createdBy: [req.user._id]
        });

        

        res.redirect('/');



    } catch (error) {
        res.redirect('/');
    }

    

};

const handleShowAllUrls = (req, res) => {
    res.end("sadas");
};

const handleShowUrlById = () => {

};

module.exports = {handleGenerateUrl, handleShowAllUrls, handleShowUrlById};