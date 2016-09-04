// Load required packages
var ProductVariant = require('../../db/models/catalog/productVariant.js');
var VariantPrice = require('../../db/models/catalog/variantPrice.js');
var mongoose = require('mongoose');
var Product = require('../../db/models/catalog/product.js');

// Create endpoint /api/users for POST

exports.getProductAndVarientByStoreid = function(req, res) {

console.log("inside getProductAndVarientByStoreid"+req.params.storeid)
Product.find({storeId:req.params.storeid},function(err, result){

   if(err){
        console.log(err);
    }

    res.send(result)
})



};






exports.createProductVariant = function(req, res) {




 var productVariant = new ProductVariant({
 name: req.body.name,
 attrs:  req.body.attrs,
 productId:req.body.productId,
 sku:req.body.sku
 });



  productVariant.save(function(err,data) {
   if (err)
    res.send(err);

  res.json(data);
  });
};

// Create endpoint /api/users for POST
exports.createVariantPrice = function(req, res) {




 var variantPrice = new VariantPrice({
 price: req.body.price,
 sale:  req.body.sale,
 priceId:req.body.sku+"_"+req.body.productId
 });




  variantPrice.save(function(err,data) {
   if (err)
    res.send(err);

  res.json(data);
  });
};


