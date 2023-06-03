const express = require("express");
const router = express.Router();
const upload = require("../upload");
const image = require("../controllers/itemController");
const User = require("../controllers/userController");
const Cart = require("../controllers/cartController");
const mid = require("../middleware/auth");
const authorization = require("../middleware/auth");
// user login api
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/getUserBy/:userId", User.getUserById);
// user logout
router.post('/logOut', authorization,User.userLogout)
// item apis
router.post("/upload", upload.array("images"), image.createImage);
router.get("/getAllImages", image.getAllImages);
router.get("/getImage/:id", image.getImageById);
router.get("/image/:image", image.getImageByName);

// cart apis
router.post("/addToCart", authorization, Cart.addToCart);
router.delete("/deleteCart/:userId", Cart.removeCart);
// router.get("/getCart", Cart.getCart);

module.exports = router;
