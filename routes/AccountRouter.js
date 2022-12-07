const express = require('express');
const router = express.Router();
const { postRegister, postLogin, checkToken } = require('../controllers/AccountController');


router.post('/register', postRegister);
router.post('/login', postLogin);
router.get('/check-token', checkToken);


module.exports = router;