const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const cartItemSchema = new mongoose.Schema({
    product: { type: ObjectId, ref: 'Item' },
    quantity: Number
},{timestamps:true});

module.exports = mongoose.model("Cart", cartItemSchema); 
