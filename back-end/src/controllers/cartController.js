const mongoose = require("mongoose");
const Cart = require("../models/cartModel"); // Đảm bảo đúng đường dẫn


// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debug dữ liệu từ client

    const { userId, items } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing userId or items" });
    }

    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // Kiểm tra từng sản phẩm trong giỏ hàng
    for (let item of items) {
      if (!item.productId) {
        return res.status(400).json({ error: "Missing productId in items" });
      }
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ error: `Invalid productId: ${item.productId}` });
      }
      if (!item.quantity || typeof item.quantity !== "number") {
        return res.status(400).json({ error: "Quantity must be a valid number" });
      }
    }

    // Tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      items.forEach((newItem) => {
        const existingItem = cart.items.find((item) => item.productId.equals(newItem.productId));
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });
    }

    await cart.save();
    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Lấy giỏ hàng của người dùng
 const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Giỏ hàng trống" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
 const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại" });

    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cập nhật số lượng thành công", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 module.exports = { getCart, removeFromCart, addToCart,  updateCartItemQuantity}