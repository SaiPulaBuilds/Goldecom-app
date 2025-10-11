const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    productName:{
        type:String,

    },
    productPrice:{
        type:String
    },
    productImage:{
        type:String,
    },
    productDescription:{
        type:String,
    },
    stockValue:{
        type:String,
    }


});
const Product=new mongoose.model('Product',productSchema);
module.exports=Product;



