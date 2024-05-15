const { createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList, getCategoryData, updateCategory, updateProduct } = require('../controllers/categoryController.js');

const { Router } = require('express');
const adminAuth = require('../middleware/adminAuth.js');

const router = Router();

router.post('/create', createCategory);
// router.post('/subcategory/create', createSubCategory);
router.post('/product/create', addProduct);
router.get('/', adminAuth , getCategoryList);
// router.get('/subcategory/:categoryId', getSubCategoryList);
router.get('/product/:categoryId/', getCategoryData);
router.post('/update', updateCategory);
router.post('/product/update', updateProduct);

module.exports = router;

