const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    fullname:{type:String, required:true},
    role:{type:String, required:true},
    basket:[{
        product:{type:Types.ObjectId, ref:'Catalog'},
        count:{type:Number, required:true}
    }],
    deliveryAddress:{type:String}
})

module.exports = model('User',schema)