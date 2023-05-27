const express = require("express");
const app = express();
const route = require("./routes/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 5000;
const image = require("./controllers/imageController");
const Image= require('./models/imageModel')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/newImages",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });

//   const getAllImages= async(req,res)=>{
//     try {
//         let getImage = await Image.find({});
//         if(!getImage){
//             return res.status(400).json({status:false, message:"not have any images"})
//         }
//         return res.status(200).json({ status: true, data: getImage });
//     } catch (error) {
//         console.log(error);
//     }
// }
// app.get('/getAllImages',async(req,res)=>{
//   try {
//     let getImage = await Image.find({});
//     if(!getImage){
//         return res.status(400).json({status:false, message:"not have any images"})
//     }
//     return res.status(200).json({ status: true, data: getImage });
// } catch (error) {
//     console.log(error);
// }
// })
app.get("/image/:filename", (req, res) => {
  const fileName = req.params.filename;
  console.log(__dirname);
  const filePath = __dirname + "/uploads/" + fileName;

  res.sendFile(filePath);
});
app.use("/", route);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
