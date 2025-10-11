const express=require('express');
const cors = require('cors');
const path = require('path');
const productroute=require('./productroute')
const cartroute=require("./cartRoute")
require("dotenv").config();

const app=express();
const mongodb=require('./db')
const route=require('./routes')
app.use('/images',express.static(__dirname+'/images'));
// app.use(express.static(__dirname + '/frontend'));
app.use(express.static(path.join(__dirname, '../frontend')));
mongodb();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  
app.use(route)
app.use(productroute)
app.use(cartroute)


   
app.listen(3000,()=>{
    console.log('server is running');
})