// src/models/ProductModel.js
const mongoose = require('mongoose');
const categoryModel = require('./categoryModel');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId},
    purchases: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    review: { type: Array, default: [] }
});

module.exports = mongoose.model('Product', productSchema);
