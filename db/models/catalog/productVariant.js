// Load required packages
var mongoose = require('mongoose');




// Define our user schema
var ProductVaraintSchema = new mongoose.Schema({

       "name":{type: String,required: true},
       "productId":mongoose.Schema.Types.ObjectId,
       "attrs":{ type : Array , "default" : [] },
       "sku":{type: String}



});


module.exports = mongoose.model('ProductVariant', ProductVaraintSchema);
