const mongoose = require("mongoose");
const Favorite = require("../models/favoriteModel");

const addToFavorites = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let favoriteList = await Favorite.findOne({ userId });
  
      if (!favoriteList) {
        // Tạo mới danh sách yêu thích
        favoriteList = new Favorite({ userId, products: [productId] });
      } else {
        // Kiểm tra sản phẩm đã có trong danh sách yêu thích
        if (!favoriteList.products.includes(productId)) {
          // Thêm sản phẩm mới vào danh sách
          favoriteList.products.push(productId);
        }
      }
  
      // Lưu thay đổi vào database
      await favoriteList.save();
      res.status(200).json({ message: "Thêm vào danh sách yêu thích thành công", favoriteList });
    } catch (error) {
      // Lỗi server
      res.status(500).json({ message: "Lỗi khi thêm vào danh sách yêu thích", error });
    }
  };
  
  const getFavorites = async (req, res) => {
    try {
      const { userId } = req.params;
      const favoriteList = await Favorite.findOne({ userId }).populate("products");
      res.status(200).json(favoriteList || { message: "Không có sản phẩm yêu thích nào" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách yêu thích", error });
    }
  };
  
  const removeFromFavorites = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let favoriteList = await Favorite.findOne({ userId });
  
      if (favoriteList) {
        favoriteList.products = favoriteList.products.filter(id => id.toString() !== productId);
        await favoriteList.save();
      }
  
      res.status(200).json({ message: "Xóa khỏi danh sách yêu thích thành công", favoriteList });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa khỏi danh sách yêu thích", error });
    }
  };

  module.exports = {addToFavorites, getFavorites, removeFromFavorites}