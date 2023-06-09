const mongoose=  require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId;

const buyModel= new mongoose.Schema({
    userId:{type:ObjectId,ref:"User",required:true, trim:true},
    itemId:[{type:ObjectId,ref:"Item",required:true, trim:true}],
    price:{type:Number, required:true, trim:true},
},{timestamps:true})

module.exports =mongoose.model("BuyProduct",buyModel)