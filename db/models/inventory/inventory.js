// Load required packages
var mongoose = require('mongoose');




// Define our user schema
var Inventory = new mongoose.Schema({
 
        "variantId":{type: String},
        "qualtity":{type: String},
        "cart":{
            cartid:{type: String},
            lastupdated:{ type: Date, default: Date.now },
        }
    
});