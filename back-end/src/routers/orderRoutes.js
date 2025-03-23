const express = require("express");
const { placeOrder, getUserOrders, updateOrderStatus, getOrdersByUser } = require("../controllers/orderController");
const router = express.Router();

router.post("/place", placeOrder);
router.get("/:userId", getOrdersByUser);
router.put("/update-status", updateOrderStatus);

module.exports = router;
