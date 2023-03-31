const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    value: { type: Array, required: true },
})

module.exports = model('Site_Components', schema)