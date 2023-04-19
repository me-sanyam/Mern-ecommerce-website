const USER = require("../models/usermodel");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" })
const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors");

exports.isAuthenticatedUser = CatchAsyncErrors(
    async (req, res , next) => {
        const { token } = req.cookies;
        if (!token) {
            res.status(400).json({
                message: "Login to get access"
            })
        }

        const decodeduser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await USER.findById(decodeduser.id);
        next();
    }
)

exports.isAuthourizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: `${req.user.role} cannot access this Functioning`
                })
            )
        }
        next()
    }
}