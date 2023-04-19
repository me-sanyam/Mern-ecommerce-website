const ORDER = require("../models/ordermodel");
const PRODUCT = require("../models/productmodel");
const ErrorHandler = require('../utils/errorhandler')
const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors")

exports.CreateOrder = CatchAsyncErrors(
    async (req, res, next) => {
        const {
            ordereditem,
            shippinginfo,
            itemprice,
            shipcost,
            tax,
            totalprice,
            paymentinfo
        } = req.body;

        const order = await ORDER.create({
            shippinginfo,
            user: req.user.id,
            ordereditem,
            paymentinfo,
            paidat: Date.now(),
            itemprice,
            shipcost,
            tax,
            totalprice
        });

        res.status(200).json({
            success: true,
            order
        })
    }
)

exports.getsingleorder = CatchAsyncErrors(
    async (req, res, next) => {
        const order = await ORDER.findById(req.params.id).populate("user", 'name email');
        if (!order) {
            return next(new ErrorHandler(`Order with ${req.params.id} not found`, 400));
        }
        res.status(200).json({
            success: true,
            order
        })
    }
)

exports.myorders = CatchAsyncErrors(
    async (req, res, next) => {
        const orders = await ORDER.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            orders
        })
    }
)

exports.allorders = CatchAsyncErrors(
    async (req, res, next) => {
        const orders = await ORDER.find();
        let totalamt = 0;
        orders.forEach(order => {
            totalamt += order.totalprice;
        })
        res.status(200).json({
            success: true,
            totalamt,
            orders
        })
    }
)

exports.updateorder = CatchAsyncErrors(
    async (req, res, next) => {
        const order = await ORDER.findById(req.params.id);
        if (order.orderstatus == "delivered" || order.orderstatus == "Delivered") {
            return next(new ErrorHandler(`Order with ${req.params.id} is already delivered`, 400))
        }
        order.ordereditem.forEach(async element => {
            const product = await PRODUCT.findById(String(element.product));
            product.stock = product.stock - element.quantity;
            await product.save();
        });
        order.orderstatus = req.body.status;
        order.delivered = Date.now();
        await order.save();
        res.status(200).json({
            success: true,
        })
    }
)

exports.deleteOrder = CatchAsyncErrors(
    async (req, res, next) => {
        const order = await ORDER.findById(req.params.id)
        if (!order) {
            return next(new ErrorHandler(`Order with ${req.params.id} not found`, 400))
        }
        await order.remove();
        res.status(200).json({
            success: true
        })
    }
)