const mongoose = require('mongoose');
const USER = require("../models/usermodel")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true,
        maxLength: [100, 'Product Name cannot exceed 100 Characters']
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Product Price'],
        default: 0,
        maxLength: [5, 'Price cannot exceed 5 digits']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'mens',
                'womens',
                'smartwatch',
                'shoes',
                'mobiles',
                'laptops',
                'kids',
                'toys',
                'handbags',
                'bagpacks',
                'headphones',
                'accessories'
            ],
            message: "Please select correct category of Product"
        }
    },
    size: [
        {
            value: {
                type: String,
                default: 'none'
            }
        }
    ],
    seller: {
        type: String,
        required: [true, 'Please enter seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter stock of Product'],
        maxLength: 5,
        default: 0
    },
    numofreviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: USER
            },
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdat: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema);