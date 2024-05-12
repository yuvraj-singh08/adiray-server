const { createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList } = require('../controllers/categoryController.js');

const { Router } = require('express');

const router = Router();

router.post('/create', createCategory);
router.post('/subcategory/create', createSubCategory);
router.post('/product/create', addProduct);
router.get('/', getCategoryList);
router.get('/subcategory/:categoryId', getSubCategoryList);
router.get('/product/:categoryId/:subCategoryId', getProductList);

module.exports = router;

