const PRODUCT = require('../models/productmodel');
const SearchFilterAPI = require('../middlewares/SearchFilterAPI');
const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const ErrorHandler = require('../utils/errorhandler');
const cloudinary = require('cloudinary');

//creating new product
exports.newproduct = CatchAsyncErrors(
    async (req, res) => {

        let imageslinks = [];
        for (let index = 0; index < req.body.images.length; index++) {

            const result = await cloudinary.v2.uploader.upload(req.body.images[index], {
                folder: 'Products'
            })

            imageslinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            images: imageslinks,
            category: req.body.category,
            stock: req.body.stock,
            seller: req.body.seller
        }
        const product = await PRODUCT.create(data);
        res.status(200).json({
            success: true,
            product
        })
    }
)


// Get All products + filters + Pagenation
exports.getproducts = CatchAsyncErrors(
    async (req, res) => {
        const ResultsPerPage = 6;
        let seachfilterapi = new SearchFilterAPI(PRODUCT.find(), req.query).search().filter()
        const TotalQueryProducts = await seachfilterapi.query;
        seachfilterapi = new SearchFilterAPI(PRODUCT.find(), req.query).search().filter().paginate(ResultsPerPage)
        const products = await seachfilterapi.query;
        res.status(200).json({
            success: true,
            Count: products.length,
            TotalProducts: TotalQueryProducts.length,
            products,
        })
    }
)

// get random required number products in specified category 
exports.getRandomProduct = CatchAsyncErrors(
    async (req, res) => {
        let products;
        if (req.query.filter !== undefined) {
            products = await PRODUCT.aggregate([{ $match: { category: req.query.filter } }, { $sample: { size: 8 } }])
        }
        else {
            products = await PRODUCT.aggregate([{ $sample: { size: 8 } }])
        }
        res.status(200).json({
            success: true,
            Count: products.length,
            products,
        })
    }
)

// Get Single Product by ID
exports.getSingleProduct = CatchAsyncErrors(
    async (req, res, next) => {
        const product = await PRODUCT.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("product not found", 404));
        }
        return res.status(200).json({
            success: true,
            product
        })
    }
)


exports.getadminproducts = CatchAsyncErrors(
    async (req, res, next) => {

        const products = await PRODUCT.find();

        return res.status(200).json({
            success: true,
            products
        })
    }
)

// Update Product via ID
exports.updateProduct = CatchAsyncErrors(
    async (req, res, next) => {

        const product = await PRODUCT.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }

        let imageslinks = [];
        for (let index = 0; index < req.body.images.length; index++) {

            const result = await cloudinary.v2.uploader.upload(req.body.images[index], {
                folder: 'Products'
            })

            imageslinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.images = imageslinks;
        product.category = req.body.category;
        product.stock = req.body.stock;
        product.seller = req.body.seller;

        await product.save()
        return res.status(200).json({
            success: true,
        })
    }
)

//Delete product using id
exports.deleteProduct = CatchAsyncErrors(
    async (req, res, next) => {

        console.log(req.params.id)
        const product = await PRODUCT.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }

        // for (let index = 0; index < product.images.length; index++) {
        //     const result = await cloudinary.v2.uploader.destroy(product.images[index]._id)
        // }

        await product.remove();
        return res.status(200).json({
            message: "Product deleted sucessfully",
            success: true
        })
    }
)



exports.createreview = CatchAsyncErrors(
    async (req, res) => {
        const { ratings, productid, comments } = req.body

        const review = {
            user: req.user._id,
            name: req.user.name,
            ratings: Number(ratings),
            comment: comments
        }

        const product = await PRODUCT.findById(productid)

        const isreviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        )

        if (isreviewed) {
            product.reviews.forEach(review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comments;
                    review.ratings = ratings;
                }
            })
        } else {
            product.reviews.push(review);
            product.numofreviews = product.reviews.length;
        }

        product.ratings = product.reviews.reduce((acc, item) => item.ratings + acc, 0) / product.reviews.length;
        await product.save();
        res.status(200).json({ success: true })
    }
)


exports.getproductreviews = CatchAsyncErrors(
    async (req, res) => {
        const product = await PRODUCT.findById(req.params.id);

        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    }
)

exports.deletereviews = CatchAsyncErrors(
    async (req, res) => {
        const product = await PRODUCT.findById(req.query.productid);

        const reviews = product.reviews.filter(review => review.id.toString() !== req.query.id.toString())
        const numofreviews = reviews.length;
        const ratings = product.reviews.reduce((acc, item) => item.ratings + acc, 0) / reviews.length;

        await PRODUCT.findByIdAndUpdate(req.query.productid, {
            reviews,
            numofreviews,
            ratings
        })
        res.status(200).json({ success: true })
    }
)