const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  totalPrice: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

// Khi gọi `find()`, tự động populate productId để lấy thông tin sản phẩm
orderSchema.pre(/^find/, function (next) {
  this.populate('items.productId'); 
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
