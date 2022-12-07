const News = require('../models/NewsModel');
const mongoose = require('mongoose');

const postCreateNews = (req, res) => {
    const { categoryId, title, description, img } = req.body;
    const news = new News({
        categoryId: mongoose.Types.ObjectId(categoryId),
        title,
        description,
        img,
    });

    news.save()
        .then(() => res.json({
            status: 200,
            message: 'News created. ID: ' + news._id,
        }))
        .catch(err => res.json({
            status: 500,
            message: err.message,
        }));

};

const getAllNews = async (req, res) => {
    try {
        const news = await News.find({}).populate('categoryId');
        if (news) {
            res.json({
                status: 200,
                news
            });
        } else {
            res.json({
                status: 404,
                message: 'News not found',
            });
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message,
        });
    }
};

const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.findById(id).populate('categoryId');
        if (news) {
            res.json({
                status: 200,
                news
            });
        } else {
            res.json({
                status: 404,
                message: 'News not found',
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
    postCreateNews,
    getAllNews,
    getNewsById,
};