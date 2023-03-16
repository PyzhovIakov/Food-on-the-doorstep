const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
    userId:{type:Types.ObjectId, ref:'User'},
    listProducts:[{
        product:{type:Types.ObjectId, ref:'Catalog'},
        count:{type:Number,required:true}
    }],
    status:{type:String, required:true},
    fullname:{type:String, required:true},
    dateOrder:{type:Date, required:true},
    dateDelivery:{type:Date, required:true},
    deliveryAddress:{type:String, required:true}
})

module.exports = model('Order',schema)