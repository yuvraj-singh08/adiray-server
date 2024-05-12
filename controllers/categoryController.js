const Category = require('../models/category.js');

const createCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const data = await Category.find({ name: name });
        if (data.length > 0) {
            return res.status(400).json({ message: "category already exists. " });
        }
        const newCategory = new Category({
            name,
            imageUrl,
            subCategory: []
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const categoryData = await Category.findById(categoryId);
        if (!categoryData) {
            return res.status(400).json({ message: "Category not found." });
        }
        const data = categoryData.subCategory.find(sub => sub.name === name);
        if (data) {
            return res.status(400).json({ message: "Subcategory already exists." });
        }
        const newSubCategory = {
            name,
            products: []
        };
        categoryData.subCategory.push(newSubCategory);
        const savedCategory = await categoryData.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, imageUrl, url, categoryId, subCategoryId } = req.body;

        // Find the category by ID
        const category = await Category.findById(categoryId);

        // If category not found, return error
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found.' });
        }

        // Find the subcategory within the category by ID
        const subCategory = category.subCategory.find(sub => sub._id == subCategoryId);

        // If subcategory not found, return error
        if (!subCategory) {
            s
            return res.status(404).json({ success: false, message: 'Subcategory not found in this category.' });
        }

        // Create a new product object
        const newProduct = {
            name,
            imageUrl,
            url
        };

        // Push the new product into the subcategory's products array
        subCategory.products.push(newProduct);

        // Save the updated category
        await category.save();

        res.status(201).json({ success: true, message: 'Product added successfully.', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add product.', error });
    }
};

const getCategoryList = async (req, res) => {
    try {
        const categories = await Category.find().select('_id name imageUrl');
        const formattedCategories = categories.map(category => ({
            id: category._id,
            name: category.name,
            imageUrl: category.imageUrl
        }));
        res.status(200).json(formattedCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSubCategoryList = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId }).select('subCategory');
        const formattedSubCategory = category.subCategory.map(data => {
            const temp = {
                id: data._id,
                name: data.name,
            };
            return temp;
        });
        res.status(200).json(formattedSubCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProductList = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId }).select('subCategory');
        const subCategory = category.subCategory.find(sub => sub._id == subCategoryId);
        const products = subCategory.products;
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList };