const express = require('express');
const cors = require('cors')
const app = express();
const CookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser")
const ErrorMiddleware = require('./middlewares/Errors')
const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaughtException');
    process.exit(1);
})

dotenv.config({ path: "backend/config/config.env" })

// app.use(express.json());
app.use(express.json({
    limit: '50mb'
  }));
app.use(CookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))

// Importing all routes 
const products = require("./routes/products");
const user = require('./routes/auth');
const order = require("./routes/order");
const payments = require("./routes/payments");

app.use("/api", products);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payments);

app.use(ErrorMiddleware);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



module.exports = app;

