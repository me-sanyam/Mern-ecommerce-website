const mongoose = require('mongoose');

const ConnectDatabase = ()=>{
    mongoose.connect(process.env.db_url ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Database Connection Successfull")
    })
}
module.exports = ConnectDatabase;