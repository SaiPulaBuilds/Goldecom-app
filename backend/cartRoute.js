const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Cart = require("./cartSchema");
const Product = require("./schemaProducts");
router.get("/api/cart", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      const cartItems = await Cart.find({ userId }).populate("productId");
  
      const formatted = cartItems.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        productName: item.productId?.productName,
        productPrice: item.productId?.productPrice,
        productImage: item.productId?.productImage
      }));
  
      res.json(formatted);
    } catch (err) {
      console.error("Cart fetch error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  


router.post("/api/cart", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      const { productId } = req.body;
  
      const existingItem = await Cart.findOne({ userId, productId });
      if (existingItem) {
        existingItem.quantity += 1;
        await existingItem.save();
      } else {
        await Cart.create({ userId, productId, quantity: 1 });
      }
  
      res.json({ message: "Added to cart" });
    } catch (err) {
      console.error("Add to cart error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.patch("/api/cart/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const cartItem = await Cart.findById(req.params.id);
      if (!cartItem || cartItem.userId.toString() !== decoded.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      cartItem.quantity += req.body.change;
  
      if (cartItem.quantity <= 0) {
        await cartItem.deleteOne();
        return res.json({ removed: true });
      }
  
      await cartItem.save();
      res.json({ newQuantity: cartItem.quantity });
    } catch (err) {
      console.error("Quantity update error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.delete("/api/cart/:id", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const cartItem = await Cart.findById(req.params.id);
      if (!cartItem || cartItem.userId.toString() !== decoded.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      await cartItem.deleteOne();
      res.json({ message: "Item removed" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  

module.exports = router;
