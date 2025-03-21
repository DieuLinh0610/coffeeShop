const express = require("express");
const { addToFavorites, getFavorites, removeFromFavorites } = require("../controllers/favoriteController");

const router = express.Router();

router.post("/add", addToFavorites);
router.get("/:userId", getFavorites);
router.post("/remove", removeFromFavorites);

module.exports = router;