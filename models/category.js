const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: [productSchema],
        required: false,
    }
})

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    subCategory: {
        type: [subCategorySchema],
        required: false,
    }
});

const category = mongoose.model('category', categorySchema);
module.exports = category;