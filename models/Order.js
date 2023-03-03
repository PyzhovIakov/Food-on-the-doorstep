const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    userId:{type:Types.ObjectId, ref:'User',required:true},
    listProducts:[{type:Types.ObjectId, ref:'Catalog'}],
    status:{type:String, required:true}
})

module.exports = model('Order',schema)