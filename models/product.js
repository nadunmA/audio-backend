import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        uniqe : true
    },

    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "uncategorized"
    },

    dimensions : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    avability : {
        type : Boolean,
        required : true,
        default : true
    }
})

const Product = mongoose.model("Product",productSchema);

export default Product;