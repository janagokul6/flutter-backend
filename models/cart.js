const mongoose = require("mongoose");

const cartModel = mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    ordered: {
        type: Boolean,
        default: false,
    },
}, {timestamps: {}})

module.exports = mongoose.model("Cart", cartModel);