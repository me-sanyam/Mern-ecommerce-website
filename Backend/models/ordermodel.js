const mongoose = require('mongoose');
const USER = require("../models/usermodel")
const PRODUCT = require("../models/productmodel")

const orderschema = new mongoose.Schema({
    shippinginfo: {
        address: {
            type: String,
            // required: true
        },
        city: {
            type: String,
            // required: true
        },
        phoneno: {
            type: String,
            // required: true
        },
        postalcode: {
            type: String,
            // required: true
        },
        country: {
            type: String,
            // required: true
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER
    },
    ordereditem: [
        {
            name: {
                type: String,
                // required: true
            },
            quantity: {
                type: String,
                // required: true
            },
            Image: {
                type: String,
                // required: true
            },
            price: {
                type: String,
                // required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                // required: true,
                ref: PRODUCT
            }
        }
    ],
    paymentinfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidat: {
        type: Date
    },
    itemprice: {
        type: Number,
        required: true,
        default: 0.0
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    shipcost: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalprice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderstatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    delivered: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("order", orderschema);