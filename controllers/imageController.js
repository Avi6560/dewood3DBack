const { default: mongoose } = require("mongoose");
const Image = require("../models/imageModel");

const createImage = async (req, res) => {
  try {
    let body = req.body;
    // const {name,price,description,collectionType}=body
    // if(!name|| !collectionType|| !price|| !description){
    //     return res.status(400).json({status:false, message:"all fields are required"})
    // }
    let imageUrls = [];
    const files = req.files.map((file) => ({
      // filename: `http://localhost:5000/uploads/${file.originalname}`,
      filename: file.originalname,
    }));
    console.log("files", files);
    for (let file of files) {
      console.log(file, "filename");
      imageUrls.push(file.filename);
    }
    console.log("images", imageUrls);
    const obj = {
      imageUrls: imageUrls,
    };

    const savedFiles = await Image.create(obj);
    // console.log(savedFiles);
    res.status(201).send({
      message: "Images uploaded and saved successfully.",
      data: savedFiles,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllImages = async (req, res) => {
  try {
    let getImage = await Image.find({});
    if (!getImage) {
      return res
        .status(400)
        .json({ status: false, message: "not have any images" });
    }
    return res.status(200).json({ status: true, data: getImage });
  } catch (error) {
    console.log(error);
  }
};

const getImageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: false, message: "invalid image id" });
    }
    const findImageById = await Image.findById({ _id: id });
    if (!findImageById) {
      return res.status(404).json({ status: false, message: "not found id" });
    }
    return res
      .status(200)
      .json({
        status: true,
        message: "image found by id",
        data: findImageById,
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createImage, getAllImages, getImageById };
