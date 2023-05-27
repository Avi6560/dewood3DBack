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
    "mongodb://localhost:27017/decentra",
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

    app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`${imageName}`, { root: './public' }, (err) => {
      if (err) {
        console.error(err);
        res.status(404).end();
      }
    });
  });
app.use("/", route);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
