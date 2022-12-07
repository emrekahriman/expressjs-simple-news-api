const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authentication = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.json({ status: 401, message: 'Access denied. Token is not provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        // If user is not found
        if (!user) return res.json({ status: 401, message: 'Invalid token. User not found' });

        req.user = decoded;
        next();
        
    } catch (err) {
        console.log(err);
        res.json({ status: 500, message: err.message });
    }
};

module.exports = authentication;