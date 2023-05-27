const express = require("express");
const router = express.Router();
const upload = require("../upload");
const image = require("../controllers/imageController");
const User = require('../controllers/userController')
// user login api
router.post("/register", User.register);
router.post("/login", User.login);



router.post("/upload", upload.array("images"), image.createImage);
router.get("/getAllImages", image.getAllImages);
router.get("/getImage/:id", image.getImageById);
router.get('/image/:image',image.getImageByName)

module.exports = router;
