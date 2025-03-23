// src/routers/ProductRouter.js
const express = require('express');
const { getAllProducts, getProductsByCategory, searchProducts, addProduct, deleteProduct } = require('../controllers/ProductController');

const router = express.Router();
router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/search', searchProducts);
router.post("/create", addProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
