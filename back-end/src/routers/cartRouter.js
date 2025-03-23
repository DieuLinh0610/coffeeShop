const express = require('express');
const { addToCart, getCart, removeFromCart, updateCartItemQuantity,  } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/add" , authMiddleware, addToCart);
router.get("/" , authMiddleware, getCart);
router.post("/remove" , authMiddleware, removeFromCart);
router.put("/update", authMiddleware, updateCartItemQuantity); 

module.exports = router;