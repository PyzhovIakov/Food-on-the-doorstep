const {Schema, model} = require('mongoose')

const schema = new Schema({
    name:{type:String, required:true},
    category:{type:String, required:true},
    weight:{type:String},
    price:{type:Number, required:true},
    description:{type:String, required:true},
    imageUrl:{type:String},
})

module.exports = model('Catalog',schema)