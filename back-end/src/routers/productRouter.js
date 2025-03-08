// src/routers/ProductRouter.js
const express = require('express');
const { getAllProducts, getProductsByCategory, searchProducts } = require('../controllers/ProductController');

const router = express.Router();
router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/search', searchProducts);

module.exports = router;
