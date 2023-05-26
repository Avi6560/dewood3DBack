const express = require("express");
const app = express();
const route= require('./routers/router')
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/image", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });


app.use('/',route)
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); 
});
