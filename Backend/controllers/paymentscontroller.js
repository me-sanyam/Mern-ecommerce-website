const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const dotenv = require('dotenv')
dotenv.config({ path: "backend/config/config.env" })

const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.processpayments = CatchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await Stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendstripeapi = CatchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})