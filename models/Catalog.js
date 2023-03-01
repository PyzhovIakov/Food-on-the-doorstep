const {Schema, model} = require('mongoose')

const schema = new Schema({
    name:{type:String, required:true},
    category:{type:String, required:true},
    weight:{type:String, required:true},
    price:{type:Number, required:true},
    description:{type:String, required:true}
})

module.exports = model('Catalog',schema)