const mongoose = require('mongoose');
const Category = require('../models/CategoryModel');


const postCreateCategory =  (req, res) => {
    const { title, description } = req.body;

    const category = new Category({
        title,
        description
    });

    category.save()
        .then(() => res.json({
            status: 200,
            message: 'Category created. ID: ' + category._id,
        }))
        .catch(err => {
            console.log(err);
            res.json({
                status: 500,
                message: err.message,
            })
        });

};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories) {
            res.json({
                status: 200,
                categories
            });
        } else {
            res.json({
                status: 404,
                message: 'Category not found',
            });
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message,
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id)
        if (category) {
            res.json({
                status: 200,
                category
            });
        } else {
            res.json({
                status: 404,
                message: 'Category not found',
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
    postCreateCategory,
    getAllCategories,
    getCategoryById
};