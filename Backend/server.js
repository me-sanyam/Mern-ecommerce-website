const app = require('./app');
const ConnectDatabase = require('./config/database');
const dotenv = require('dotenv')
dotenv.config({path:"backend/config/config.env"})

// Connecting to Database
ConnectDatabase();

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down server due to Unhandled promise rejections');
    server.close(()=>{
        process.exit(1);
    })
})