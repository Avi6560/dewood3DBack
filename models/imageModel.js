const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    imageUrls: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", imageSchema);
