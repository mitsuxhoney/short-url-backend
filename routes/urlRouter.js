const express = require('express');

const urlRouter = express.Router();

const { handleGenerateUrl, handleRedirectToUrlById, handleDeleteUrlById } = require('../controllers/urlController');
const auth = require('../middlewares/auth');

urlRouter.post('/', auth, handleGenerateUrl);

urlRouter.route('/:id')
.get(auth, handleRedirectToUrlById)
.post(auth, handleDeleteUrlById)


module.exports = urlRouter;