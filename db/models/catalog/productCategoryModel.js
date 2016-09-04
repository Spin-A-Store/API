// Load required packages
var mongoose = require('mongoose');


//*********************************************************************//
// most  of the quries will  be execute  on parent and category so index has
// to be created on these two fields

// **********************************************************************
var ProductCategorySchema = new mongoose.Schema({
        "storeid":{type: String,required: true},
        "name":{type: String,required: true},
        "parent":{type: String,required: true},
        "category":{type: String,required: true},
        "slug":{type: String}




});


module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
