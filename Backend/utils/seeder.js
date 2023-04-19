const PRODUCT = require('../models/productmodel');
const dotenv = require('dotenv');
const ConnectDatabase = require('../config/database');

const product = require('../Data/Data.json');

dotenv.config({path:"backend/config/config.env"})


ConnectDatabase();


const seedProducts = async ()=>{
    try{
        await PRODUCT.deleteMany();
        console.log("products deleted");

        await PRODUCT.insertMany(product);
        console.log("products added");

        process.exit();

    } catch(err){
        console.log(err.message);
        process.exit();
    }
}

seedProducts();