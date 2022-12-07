const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const postRegister = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const password = await bcrypt.hash(req.body.password, 12);

        const user = await User.findOne({ email });
        if (user) {
            res.json({
                status: 400,
                message: 'Email already exists',
            });
        } else {
            const newUser = new User({ fullName, email, password });
            await newUser.save()
            res.json({
                status: 200,
                message: 'User created. ID: ' + newUser._id,
            });
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message,
        });
    }
}



const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {  // if user not found
            res.json({
                status: 404,
                message: "This email is not registered.",
                token: null,
            });
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {  // if password is not match
                res.json({
                    status: 404,
                    message: "Password is incorrect.",
                    token: null,
                });
            } else {
                const token = jwt.sign({ _id: user._id, fullName: user.fullName, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.json({
                    status: 200,
                    message: "Login successful.",
                    token: token,
                });
            }
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message,
        });
    }
};


const checkToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            res.json({
                status: 404,
                message: "User not found.",
            });
        } else {
            res.json({
                status: 200,
                message: "Token is valid.",
                user: decoded,
            });
        }

    } catch (err) {
        res.json({
            status: 500,
            message: err.message,
        });
    }
};


module.exports = {
    postRegister,
    postLogin,
    checkToken,
};