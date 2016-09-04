// Load required packages
var mongoose = require('mongoose');




// Define our user schema
var VaraintPriceSchema = new mongoose.Schema({
 
        "price":{type: String},
        "priceId":{type: String},
        "sale":{
            salePrice:{type: String},
            saleDate:{ type: Date, default: Date.now },
        }
    

    
});


module.exports = mongoose.model('VaraintPrice', VaraintPriceSchema);
