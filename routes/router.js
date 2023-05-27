const express = require("express");
const router = express.Router();
const upload = require("../upload");
const image = require("../controllers/imageController");

router.post("/upload", upload.array("images"), image.createImage);
// router.get("/getAllImages", image.getAllImages);
router.get("/getImage/:id", image.getImageById);

module.exports = router;
