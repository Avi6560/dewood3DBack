const Item= require('../models/itemModel')
const User= require('../models/userModel')
const Buy= require('../models/buyModel')
const Razorpay= require('razorpay')
const crypto= require('crypto')

let razorpay = new Razorpay({key_id:'rzp_test_rctEhk9DkJO7hU',key_secret:'dH3vdnM9vuumH6JkYg8mSoJB'})


const createOrder= async(req,res)=>{
    try {
        const {amount,currency,receipt, notes}= req.body;
        razorpay.orders.create({amount:amount*100, currency, receipt, notes},
            (err, order)=>{
              if(!err)
                res.json(order)
              else
                res.send(err);
            }
        )
    } catch (error) {
        console.log(error);
    }
}


const  checkout = async (req, res) => {
    // console.log("he");
    // console.log(req.body,"mere body");
    var options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    // console.log(order,"mai order hu");
    res.status(200).json({
      success: true,
      order,
    });
  };



const verifyOrder = async(req,res)=>{
    console.log("body",req.body);
    // try {
    // const {order_id, payment_id} = req.body;
    // const razorpay_signature =  req.headers['x-razorpay-signature'];

    // const key_secret = dH3vdnM9vuumH6JkYg8mSoJB;
    // let hmac = crypto.createHmac('sha256', key_secret);
    // hmac.update(order_id + "|" + payment_id);
    // const generated_signature = hmac.digest('hex');

    // if(razorpay_signature===generated_signature){
    //     res.json({success:true, message:"Payment has been verified"})
    // }else
    // res.json({success:false, message:"Payment verification failed"})
    // } catch (error) {
    //     console.log(error);
    // }
}
module.exports ={createOrder, checkout,verifyOrder}