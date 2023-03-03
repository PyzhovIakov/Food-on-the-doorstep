const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    userId:{type:Types.ObjectId, ref:'User'},
    listProducts:[{type:Types.ObjectId, ref:'Catalog'}],
    status:{type:String, required:true},
    fullname:{type:String, required:true}
})

module.exports = model('Order',schema)