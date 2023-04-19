const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:[30,'Name cannot be more than 30 characters'],
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    ResetPasswordToken:String,
    ResetPasswordExpire:Date
})

UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})


UserSchema.methods.getresettoken = function(){
    // generate token 
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    //hash token and set top resetpasswordtoken
    this.ResetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    // set token expiry time....
    this.ResetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}


UserSchema.methods.ComparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword , this.password)
}
module.exports = mongoose.model('User', UserSchema);