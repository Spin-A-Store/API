// Load required packages
var Store = require('../../db/models/store/storeModel.js');
var hash = require('bcrypt-nodejs');
var Promise = require('bluebird');
var _ = require('lodash-node');


// Create endpoint /api/users for POST
/*exports.registerStore = function(req, res) {

                      if(!req.body) return res.send({"ERROR":"request body is null or empty"});

                        var store = new Store({
                        storename: req.body.storename,
                        owneremail: req.body.owneremail,
                        password: hash.hashSync( req.body.password ,hash.genSaltSync(5)),
                        domainname: req.body.storename
                         });

                       new Promise(
                                  function(resolve, reject) {
                                 Store.find({storename:req.body.storename},function(err,data){
                                   if(data.length){ reject({"excpcode":"S000","excpmesg":"Store alreday exist"})

                                                 } else resolve("OK");

                                            });

                                  }).then(function(nextdata){

                                   return  new Promise(
                                  function(resolve, reject) {
                                 Store.find({owneremail:req.body.owneremail},function(err,data){
                                   if(data.length){ reject({"excpcode":"S001","excpmesg":"Email already exist"})

                                                 } else resolve("OK");

                                            });

                                  })

                                  }).then(function(nextdata){

                                   return  new Promise(
                                  function(resolve, reject) {
                                 store.save(function(err,data){
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







          };


*/

exports.registerStore = function(req, res) {
                      var regexDupCode=new RegExp("^E11000","i");
                      var regexDupownerenail=new RegExp("owneremail","i");
                      var regexDupstorename=new RegExp("storename","i");
                      if(!req.body) return res.send({"ERROR":"request body is null or empty"});

                        var store = new Store({
                        storename: req.body.storename,
                        owneremail: req.body.owneremail,
                        password: hash.hashSync( req.body.password ,hash.genSaltSync(5)),
                        domainname: req.body.storename
                         });


                                 store.save(function(err,data){
                                   if(err){

                                 if(regexDupCode.test(err.errmsg) && regexDupownerenail.test(err.errmsg)){
                                      res.send({"excpcode":"S001","excpmesg":"Email already exist"})

                                 }else if(regexDupCode.test(err.errmsg) && regexDupstorename.test(err.errmsg)){

                                   res.send({"excpcode":"S000","excpmesg":"Store alreday exist"})
                                 } else {
                                  res.send(err)
                                 }




                                                 } else {

                                                  res.send(data);

                                                }

                                            });









          };



exports.storeAdminAuthentication = function(req, res) {

Store.findOne({owneremail: req.body.owneremail}, function(err,obj) {

                    if (err){
                              res.send(err);
                            }else{

                               if(obj){

                                     if (!hash.compareSync(req.body.password, obj.password)) {

                                      res.send({"excpcode":"S003","excpmesg":"Invalid password"});

                                  }else{

                                      res.send(obj);
                                     }

                                   }else{

                                   res.send({"excpcode":"S002","excpmesg":"User deos not exist"});
                                       }


                                    }



   });

};

exports.getStoreDetailsbyOwnerEmail = function(req, res) {


Store.find({owneremail:req.params.owneremail}, function(err,obj) {
  if (err){res.send(err);
  }else{

     res.send(obj);
  }



   });

};



