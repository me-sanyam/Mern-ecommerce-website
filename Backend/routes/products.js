const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, isAuthourizedRole } = require('../middlewares/authentication');

const { getproducts,
    newproduct,
    getRandomProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createreview,
    getproductreviews,
    deletereviews,
    getadminproducts
} = require("../controllers/productcontrollers")

router.route("/products").get(getproducts);
router.route("/admin/products").get(getadminproducts);
router.route("/products/aggregate").get(getRandomProduct);
router.route("/products/:id").get(getSingleProduct);
router.route("/product/new").post(isAuthenticatedUser, isAuthourizedRole("admin"), newproduct);
router.route("/products/:id").put(isAuthenticatedUser, isAuthourizedRole("admin"), updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser, isAuthourizedRole("admin"), deleteProduct);
router.route("/review").put(isAuthenticatedUser, createreview);
router.route("/review/:id").get(isAuthenticatedUser, getproductreviews);
router.route("/review/delete").delete(isAuthenticatedUser, deletereviews);
module.exports = router;