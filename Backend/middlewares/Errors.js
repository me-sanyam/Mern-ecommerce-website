const ErrorHandler = require("../utils/errorhandler");

module.exports = function ErrorsMiddleware(err, req, res, next){

    err.statuscode = err.statuscode || 500;
    err.message = err.message || 'Internal Server Error';

    if(process.env.NODE_ENV === "DEVELOPEMENT"){
        res.status(err.statuscode).json({
            success: false,
            error:err,
            message :err.message,
            stack : err.stack
        })
    }

    if(process.env.NODE_ENV === "PRODUCTION"){
        let error = {...err}

        error.statuscode = err.statuscode,
        error.message = err.message || 'Internal Server Error'

        res.status(error.statuscode).json({
            success: false,
            message : error.message
        })
    }
}