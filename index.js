const express = require("express");
const multer = require("multer");
const upload = require("./upload");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(multer().any())

mongoose
  .connect("mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/images", {
    useNewUrlParser: true,
    // useUnifiedTopology: true
  })

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

const imageSchema = new mongoose.Schema({
  imageUrls: { type: Array },
  // path: {type:String}
});

const Image = mongoose.model("Image", imageSchema);

app.post("/upload", upload.array("images"), async (req, res) => {
  try {
    // Save the uploaded files to MongoDB
    const body = req.body;
    console.log(body, "body");
    console.log(req.files, "files");
    console.log("");
    let imageUrls = [];
    const files = req.files.map((file) => ({
      // filename: `http://localhost:5000/uploads/${file.originalname}`,
      filename: file.originalname,
      // path: `${file.path}/${filename}`
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
    res.status(201).json({
      message: "Images uploaded and saved successfully.",
      data: savedFiles,
    });
  } catch (error) {
    console.error("Error saving images:", error);
    res.status(500).send("Error saving images.");
  }
});

app.get("/image/:filename", (req, res) => {
  const fileName = req.params.filename;
  console.log(__dirname);
  const filePath = __dirname + "/uploads/" + fileName;

  res.sendFile(filePath);
});

app.get("/getAllImages", async (req, res) => {
  let getImage = await Image.find({});
  return res.status(200).json({ status: true, data: getImage });
});
// app.get("/", (req, res) => {
//   res.send({ name: "avinash", age: 22, dest: "Backend developer" });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
