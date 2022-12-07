const express = require('express');
const router = express.Router();
const { postCreateNews, getAllNews, getNewsById } = require('../controllers/NewsController');


router.post('/create-news', postCreateNews);
router.get('/news', getAllNews);
router.get('/news/:id', getNewsById);



module.exports = router;