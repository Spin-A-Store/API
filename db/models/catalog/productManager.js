// Load required packages
var mongoose = require('mongoose');




// Define our user schema
var ProductManagerSchema = new mongoose.Schema({
        "onlineproductid":{type: String},
        "offlineproductid":{type: String},
});


module.exports = mongoose.model('ProductManager', ProductManagerSchema);
