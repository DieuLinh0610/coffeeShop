const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Đặt hàng
const placeOrder = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
      }
  
      // Tìm giỏ hàng của user
      const cart = await Cart.findOne({ userId }).populate("items.productId");
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng trống, không thể đặt hàng" });
      }
  
      // Tính tổng tiền đơn hàng
      let totalPrice = 0;
      cart.items.forEach((item) => {
        totalPrice += item.productId.price * item.quantity;
      });
  
      // Tạo đơn hàng mới
      const newOrder = new Order({
        userId,
        items: cart.items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        totalPrice,
      });
  
      await newOrder.save();
  
      // Chỉ xóa các items trong giỏ hàng, giữ lại cart
      cart.items = [];
      await cart.save();
  
      res.status(201).json({ message: "Đặt hàng thành công", order: newOrder });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Lấy danh sách đơn hàng của người dùng
const getOrdersByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ userId }).populate('items.productId');
      
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy lịch sử đơn hàng' });
    }
  };
  

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid orderId format" });
    }

    const validStatuses = ["pending", "processing", "shipped", "delivered", "canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { placeOrder, getOrdersByUser, updateOrderStatus };
