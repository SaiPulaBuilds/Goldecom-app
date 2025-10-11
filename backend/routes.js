const express=require('express');
const model=require('./schema');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

const router=express.Router();

router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email+" "+password);
       const user=await model.findOne({email});
       if(!user) return res.status(401).json({message:"User not found"});
       const isMatch=await bcrypt.compare(password,user.password);
       const token=jwt.sign({userId:user._id,name:user.name},JWT_SECRET,{expiresIn:"1d"});
       res.json({message:"Login successful",token})

     

        }catch(err){
            console.log("error occured :"+err.message);
        }

})

router.post('/register',async (req,res)=>{
    try{
    const {name,email,phoneNo,password}=req.body;
    const existingUser=await model.findOne({email});
    if(existingUser){
      return res.status(400).send("User already exists");
    }
   const hashedPassword=await bcrypt.hash(password,10);
   const newUser=new model({name,email,phoneNo,password:hashedPassword});
   await newUser.save();
   const token = jwt.sign({ userId: newUser._id ,name:newUser.name}, JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Registered and logged in", token });

    // res.redirect('/index.html?registered=true');

    }catch(err){
        console.log("Error",err.message);
        res.status(400).send(`Registration failed:${err.message}`);
    }
})
module.exports=router;