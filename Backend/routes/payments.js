const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/authentication');
const {
    processpayments,
    sendstripeapi
} = require("../controllers/paymentscontroller");

router.route("/payment/process").post(isAuthenticatedUser, processpayments);
router.route("/stripeapi").get(isAuthenticatedUser, sendstripeapi);

module.exports = router;