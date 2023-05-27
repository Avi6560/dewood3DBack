const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    // name: { type: String },
    // price: { type: String },
    // collectionType: [{ type: String }],
    // description: { type: String },
    images: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", imageSchema);
