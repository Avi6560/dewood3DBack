const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    cnfPassword: { type: String, required: true, minlength: 8 },
    carts: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
