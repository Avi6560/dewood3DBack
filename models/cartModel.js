const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const cartItemSchema = new mongoose.Schema({
  itemId: [{ type: ObjectId, ref: "images" }],
  quantity: { type: Number, default: 1 },
  price: { type: Number },
});

module.exports = mongoose.model("Cart", cartItemSchema); 
