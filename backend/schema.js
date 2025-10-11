
const mongoose=require('mongoose')
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        match:[/^\S+@\S+\.\S+$/,'Provide valid Email'],
        },
    phoneNo:{
            type:String,
            required:[true,'Enter Phone Number']

        },

    password:{
            type:String,
            required:[true,'Password is required'],
            minlength:6,

        },
    
},{timestamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;

