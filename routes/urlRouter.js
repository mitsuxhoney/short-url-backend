const express = require('express');

const urlRouter = express.Router();

const { handleGenerateUrl, handleShowAllUrls, handleShowUrlById } = require('../controllers/urlController');

urlRouter.post('/', handleGenerateUrl);

urlRouter.get('/', handleShowAllUrls);

urlRouter.get('/:id', handleShowUrlById);


module.exports = urlRouter;