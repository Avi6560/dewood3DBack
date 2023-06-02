const Cart = require("../models/cartModel");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    // console.log(productId, "product");
    let totalPrice = 0;
    const cart = await Item.findOne({ _id: productId });
    // console.log(cart);
    const getUser = await User.findOne({ _id: req.userId });
    console.log(getUser, "all detailsall details");

    // error part start here
    const item = getUser.carts.find((p) => p._id == productId);
    // console.log(item, "item");
    if (item) {
      // console.log("Products already added in cart");
      return res
        .status(400)
        .json({ message: "Products already added in cart" });
    } else {
      if (getUser) {
        const cartData = await getUser.addcartdata(cart);
        await getUser.save();
        console.log(cartData.price);
        let quantity=1
        totalPrice += cartData.price * quantity;
        res.status(201).json({data:{getUser, totalPrice}});
      } else {
        res.status(401).json({ message: "User not matching" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getCart = async (req, res) => {};

module.exports = { addToCart, getCart };


