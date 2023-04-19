const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, isAuthourizedRole } = require('../middlewares/authentication');
const {
    CreateOrder,
    myorders,
    getsingleorder,
    allorders,
    updateorder,
    deleteOrder
} = require("../controllers/ordercontroller");

router.route("/order/new").post(isAuthenticatedUser, CreateOrder);
router.route("/order/:id").get(isAuthenticatedUser, getsingleorder);
router.route("/myorder").get(isAuthenticatedUser, myorders);
router.route("/admin/orders").get(isAuthenticatedUser, isAuthourizedRole("admin"), allorders);
router.route("/order/update/:id").put(isAuthenticatedUser, isAuthourizedRole("admin"), updateorder);
router.route("/order/delete/:id").delete(isAuthenticatedUser, isAuthourizedRole("admin"), deleteOrder);
module.exports = router;