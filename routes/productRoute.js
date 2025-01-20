const express = require("express");
const productRouter = express.Router();

const {addProduct, getProducts, addProductToCart, getCartProducts, orderItem} = require("../controllers/productController");
const authVerify = require("../middlewares/auth_verify");
const upload = require("../middlewares/multer_config");

productRouter.post("/add", authVerify, upload.single('image'), addProduct);
productRouter.get("/get", authVerify, getProducts);
productRouter.post("/add_to_cart", authVerify, addProductToCart);
productRouter.get("/get_cart", authVerify, getCartProducts);
productRouter.post("/order", authVerify, orderItem);

module.exports = productRouter;