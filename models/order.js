const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema ({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', orderSchema)