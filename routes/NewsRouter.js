const express = require('express');
const router = express.Router();
const { postCreateNews, getAllNews, getBreakingNews, getNewsById, getNewsByCategory, getHotNews} = require('../controllers/NewsController');


router.post('/create-news', postCreateNews);
router.get('/news', getAllNews);
router.get('/news/category/:categoryId', getNewsByCategory);
router.get('/news/:id', getNewsById);
router.get('/breaking-news', getBreakingNews);
router.get('/hot-news', getHotNews);


module.exports = router;