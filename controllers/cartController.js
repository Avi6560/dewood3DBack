const Cart = require("../models/cartModel");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

const addToCart= async(req,res)=>{
    try {

        const { itemId, quantity } = req.body

        const itemPrice= await getProductPrice(itemId)
        const price = calculatePrice(itemPrice, quantity);

        const obj={
            itemId,
            quantity,
            price:price
        }
        const addToCart= await Cart.create(obj)
        return res.status(201).json({status:true, message:"add item to cart", data:addToCart})
    } catch (error) {
        console.log(error);
    }
}
const getProductPrice = async (itemId) => {
    const product = await Item.find({_id:itemId});
    console.log("product", product);
    return product
  };

const calculatePrice = (itemPrice, quantity) => {
  const price = itemPrice * quantity;
  return price;
};
// const addToCart = async (req, res) => {
//   try {
//     const { items } = req.body;z
//     let totalPrice = 0;
//     for (let item of items) {
//       const { itemId, quantity } = item;
//       const findItemById = await Item.findById({ _id: itemId });
//       if (!findItemById) {
//         return res
//           .status(404)
//           .json({ status: false, message: "Item not found" });
//       }
//       const itemPrice = findItemById.price * quantity;

//       const obj = {
//         itemId,
//         quantity,
//         price: itemPrice,
//       };
//       const addCart= await Cart.create(obj);
//       totalPrice +=itemPrice;
//       console.log("added quantity",addCart,totalPrice);

//     }
//     return res.status(201).json({status:true, message:"Item added successfully"})
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addToCart = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ error: 'No items provided' });
//     }

//     const fetchedItems = await Item.find({ _id: { $in: items.map(item => item.itemId) } });

//     // Create a new cart
//     const cart = new Cart();

//     // Populate the items array in the cart
//     fetchedItems.forEach(item => {
//       const itemData = items.find(i => i.itemId === item._id.toString());
//       if (itemData) {
//         const itemPrice = item.price * itemData.quantity;
//         cart.items.push({ item: item._id, quantity: itemData.quantity, price: itemPrice });
//         cart.totalPrice += itemPrice;
//       }
//     });

//     // Save the cart
//     await cart.save();

//     res.status(201).json({ cart });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ status: false, message: "Internal server error" });
//   }
// };



module.exports = { addToCart };
