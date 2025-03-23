
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

const addProduct = async (req, res) => {
    try {
      const { name, description, price, image, categoryId } = req.body;
  
      if (!name || !price || !categoryId) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }
  
      const newProduct = new Product({
        name,
        description,
        price,
        image,
        categoryId,
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi thêm sản phẩm" });
    }
  };

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { getAllProducts, getProductsByCategory, searchProducts, addProduct, deleteProduct};
