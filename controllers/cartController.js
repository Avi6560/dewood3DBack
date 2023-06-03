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
      return res.status(400).json({ message: "Products already added in cart" });
    } else {
      if (getUser) {
        const cartData = await getUser.addcartdata(cart);
        await getUser.save();
        console.log(cartData.price);
        res.status(201).json({data:{getUser, totalPrice}});
      } else {
        res.status(401).json({ message: "User not matching" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};



const removeCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.body.cartId;
    if(!mongoose.isValidObjectId(userId)){
      return res.status(400).json({status:false, message:"invalid user id"})
    }
    const findUser = await User.findById({ _id: userId });
    const cartItemsIndex = findUser.carts.findIndex(
      (item) => item._id == cartId
    );
    if (cartItemsIndex !== -1) {
      findUser.carts.splice(cartItemsIndex, 1);
      let updateCart = await User.updateOne({_id:userId},{
        "$set":{
          "carts":findUser.carts
        }
      })
      return res.status(200).json({status:true, message:"Cart Remove successfully"})
    }else{
      return res.status(404).json({status:false, message:"Cart does not in cart"})
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToCart,removeCart  };


