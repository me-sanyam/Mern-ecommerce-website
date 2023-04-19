const USER = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({ path: "backend/config/config.env" })
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ErrorHandler = require('../utils/errorhandler');
const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors");


exports.registeruser = CatchAsyncErrors(
    async (req, res, next) => {

        const { name, email, password } = req.body;

        // Check for data completeness
        if (!email || !password || !name) {
            return next(new ErrorHandler('Username Password and Email is required', 400))
        }

        // Check if user already exists
        const OldUser = await USER.findOne({ email: email });
        if (OldUser) {
            return next(new ErrorHandler('User Already Exists', 400))
        }
        // Create new user if doesnt exists..
        const User = await USER.create({
            name,
            email,
            password
        })
        // create token and send to cookies..
        const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME
        })
        //options for cookies..
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        // Send token to cookies ..
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            User
        })
    }
)




exports.loginuser = CatchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter both Email and Password"
            })
        }

        const User = await USER.findOne({ email: email })
        if (!User) {
            return next(new ErrorHandler('Invalid Email or Password', 400))
        }
        const ispasswordmatched = await User.ComparePassword(password);

        if (!ispasswordmatched) {
            return next(new ErrorHandler('Invalid Email or Password', 400))
        }
        // Creating token and sending cookies...
        const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME
        })

        //options for cookies
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        // Sending token to cookies..
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            User
        })
    }
)

exports.forgotpassword = CatchAsyncErrors(
    async (req, res, next) => {

        const User = await USER.findOne({ email: req.body.email })
        if (!User) {
            return next(new ErrorHandler('User with this email not found', 400));
        }

        const resetToken = User.getresettoken();

        await User.save({ validateBeforeSave: false });

        const reseturl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

        const message = `Dear Customer\n\nWe have sent you an email to  reset your password\nPlease click on the link below to reset your password\n\n ${reseturl}\n\nThis link is valid for 30 minutes only. If you have not asked for it please check your account details\n\n Regards`

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'EMAIL', // YOUR EMAIL ADDRESS HERE
                    pass: "PASSWORD" // YOUR PASSWORD HERE
                }
            });

            const options = {
                from: "EMAIL", // YOUR EMAIL ADDRESS HERE
                to: req.body.email,
                subject: "Reset Password",
                text: message
            };

            transporter.sendMail(options, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: `Email Sent at provided address` })
                }
            });

        } catch (err) {
            User.ResetPasswordToken = undefined;
            User.ResetPasswordExpire = undefined;

            await User.save({ validateBeforeSave: false });
            return next(new ErrorHandler(err, 400));
        }
    }
)


exports.resetPassword = CatchAsyncErrors(
    async (req, res, next) => {
        const Comptoken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await USER.findOne({
            ResetPasswordToken: Comptoken,
            ResetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorHandler('Password reset token invalid or has expired', 400));
        }
        if (req.body.password !== req.body.confirmpassword) {
            return next(new ErrorHandler("Password doesn't match", 400));
        }

        user.password = req.body.password;
        user.ResetPasswordToken = undefined;
        user.ResetPasswordExpire = undefined;

        await user.save();

        // Creating token and sending cookies...
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME
        })

        //options for cookies
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        // Sending token to cookies..
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })
    }
)


exports.getuserprofile = CatchAsyncErrors(
    async (req, res, next) => {
        const user = await USER.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    }
)


exports.updatepassword = CatchAsyncErrors(
    async (req, res, next) => {
        const user = await USER.findById(req.user.id);
        const ismatched = await user.ComparePassword(req.body.oldpassword)
        if (!ismatched) {
            return next(new ErrorHandler('Password Incorrect', 400));
        }
        user.password = req.body.newpassword
        await user.save()

        // Creating token and sending cookies...
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE_TIME
        })

        //options for cookies
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXP_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        // Sending token to cookies..
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })
    }

)

exports.updateuserprofile = CatchAsyncErrors(
    async (req, res, next) => {
        const newuserdata = {
            email: req.body.email,
            name: req.body.name
        }

        const user = await USER.findByIdAndUpdate(req.user.id, newuserdata)
        res.status(200).json({ success: true })
    }
)


exports.logoutuser = (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
}


exports.getallusers = CatchAsyncErrors(
    async (req, res, next) => {
        const users = await USER.find()
        res.status(200).json({
            success: true,
            users
        })
    }
)


exports.getspecificuser = CatchAsyncErrors(
    async (req, res, next) => {
        const user = await USER.findById(req.params.id)
        if (!user) {
            return next(new ErrorHandler(`User with ${req.params.id} not found`, 400));
        }
        res.status(200).json({
            success: true,
            user
        })
    }
)


exports.AdminUpdateUser = CatchAsyncErrors(
    async (req, res, next) => {
        const user = await USER.findById(req.params.id)
        if (!user) {
            return next(new ErrorHandler(`User with ${req.params.id} does not exists`, 400));
        }
        user.role = req.body.role;
        await user.save()
        res.status(200).json({
            success: true
        })
    }
)


exports.deleteUser = CatchAsyncErrors(
    async (req, res, next) => {
        const user = await USER.findById(req.params.id)
        if (!user) {
            return next(new ErrorHandler(`User with ${req.params.id} does not exists`, 400));
        }
        await user.remove()
        res.status(200).json({ message: "User Deleted Sucessfully" })
    }
)

exports.SendContactResponse = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'EMAIL', // YOUR EMAIL ADDRESS HERE
                    pass: "PASSWORD" // YOUR PASSWORD HERE
                }
            });

            const message = `${req.body.message}\n\nContact me at\n${req.body.phone}`

            const options = {
                from: "EMAIL", // YOUR EMAIL ADDRESS HERE
                to: req.body.email,
                subject: "Reset Password",
                text: message
            };
            transporter.sendMail(options, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ message: `Response sent successfully` })
                }
            });

        } catch (err) {
            return next(new ErrorHandler(err, 400));
        }
    }
)
