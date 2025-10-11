const express = require("express");
const Product = require("./schemaProducts");
const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    const productData = req.body;
    console.log("Received product:", productData);

    const newProduct = new Product(productData);
    await newProduct.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.json({ success: false, message: "Error saving product" });
  }
});
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;
