// Load required packages
var ProductCategory = require('../../db/models/catalog/productCategoryModel.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash-node');

exports.createCatergory = function(req, res) {

if(!req.body.storeid || !req.body.parent || !req.body.name) return  res.send("INPUT DATA IS NOT CORRECT");
//////////////////////////////////////////////////////////////////////////////


     var productCategory = new ProductCategory({

               name: req.body.name,
               category:req.body.parent.toLowerCase()+req.body.name.toLowerCase(),
               slug: req.body.name.toLowerCase(),
               storeid:req.body.storeid,
               parent:req.body.parent
                                });
 new Promise(
                                  function(resolve, reject) {


                                    if(req.body.parent=="/") {resolve("OK")
                                  }else {

                                 ProductCategory.find({category:req.body.parent.slice(0, req.body.parent.length-1)},function(err,data){
                                   if(data.length){

                                    resolve("OK")

                                                 } else reject({"excpcode":"PC001","excpmesg":"Parent does not exist"});

                                            });

                               }

                                  }).then(function(nextdata){

                                   return  new Promise(
                                  function(resolve, reject) {
                                 productCategory.save(function(err,data){
                                   if(err){ reject(err)

                                                 } else resolve(data);

                                            });

                                  })

                                  }).then(function(data){
                                      res.send(data);
                                  }).catch(function(err) {
                                             res.send(err);
                                             console.log(err)
                                              })



///////////////////////////////////////////////////////////////////////////////////////////////////




}

exports.deleteCategory = function(req, res) {

ProductCategory.update(
  {storeid:req.body.storeid},
  { $pull: { categories:{ "_id": req.body.categoryid}  } },
  function(err,data){
    console.log("error"+err)
                                                  if(err){

                                                        res.send(err)
                                                      }else{
                                                       res.send(data)

                                                      }


  }

  )




}

exports.deleteSubCategory = function(req, res) {

ProductCategory.findOneAndUpdate({storeid:req.body.storeid,categories:{$elemMatch: { _id: req.body.categoryid }}},
                        { $pull: { 'categories.$.values': req.body.subcategory } },
                         function(err,data){
                                                if(err){

                                                        res.send(err)
                                                      }else{
                                                       res.send(data)

                                                      }

                         }
                    )



}

exports.createSubCategory = function(req, res) {

ProductCategory.findOneAndUpdate({storeid:req.body.storeid,categories:{$elemMatch: { _id: req.body.categoryid }}},
                        { $addToSet: { 'categories.$.values': req.body.subcategory } },
                         function(err,data){
                                                if(err){

                                                        res.send(err)
                                                      }else{
                                                       res.send(data)

                                                      }

                         }
                    )
}




exports.getCategoryTree = function(req, res) {


 var expression = "^/";
  var rx = new RegExp(expression);

ProductCategory.find({storeid:req.params.storeid,parent:rx},

                         function(err,data){

                var input=[];


for (i = 0; i < data.length; i++) {
    input.push(data[i].category.slice(1, data[i].category.length));
}


var output = [];
for (var i = 0; i < input.length; i++) {
    var chain = input[i].split("/");
    var currentNode = output;
    for (var j = 0; j < chain.length; j++) {
        var wantedNode = chain[j];
        var lastNode = currentNode;
        for (var k = 0; k < currentNode.length; k++) {
            if (currentNode[k].text == wantedNode) {
                currentNode = currentNode[k].children;
                break;
            }
        }
        // If we couldn't find an item in this list of children
        // that has the right name, create one:
        if (lastNode == currentNode) {
            var newNode = currentNode[k] = {text: wantedNode, children: []};
            currentNode = newNode.children;
        }

 }

}

      if(err){

              res.send(err)
              }else{
             res.send(output)

          }

                         }
                    )
}



