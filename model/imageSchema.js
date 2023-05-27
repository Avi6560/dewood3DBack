const mongoose= require('mongoose');

const imageSchema= new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:String, required:true},
    collectionType:[{type:String, required:true}],
    description:{type:String,required:true},
    images:{type:Array},
},{timestamps:true})

module.exports =mongoose.model('dewood3d',imageSchema)