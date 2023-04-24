# Multi-Vendor-MERN-ecommerce-app
Multi-Vendor ecommerce web application in React and Node


# CHANGES TO BE MADE BEFORE RUNNING THE PROJECT

1 => Make sure to add your cloudinary and stripe details in following directory..." Backend\config\config.env " 

    CLOUDINARY_CLOUD_NAME = 'YOUR CLOUDINARY CLOUD NAME'
    CLOUDINARY_API_KEY = 'YOUR CLOUDINARY API KEY'
    CLOUDINARY_API_SECRET = 'YOUR CLOUDINARY API SECRET'

    STRIPE_SECRET_KEY = 'YOUR STRIPE SECRET KEY'
    STRIPE_API_KEY = 'YOUR STRIPE API KEY'

2 => Make sure to add your Email Address as well as password in following directory..." Backend\controllers\authcontrollers.js "

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'EMAIL', 
                pass: "PASSWORD"
            }
        });

        const options = {
            from: "EMAIL",
            to: req.body.email,
            subject: "Reset Password",
            text: message
        };