const express = require('express');
const router = express.Router();
const { postCreateCategory, getAllCategories, getCategoryById } = require('../controllers/CategoryController');


router.post('/create-category', postCreateCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);



module.exports = router;