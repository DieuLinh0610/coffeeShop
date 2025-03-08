
const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ categoryId }).populate('categoryId');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: new RegExp(name, 'i') }).populate('categoryId');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllProducts, getProductsByCategory, searchProducts };
