// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//**************************************************************//
           //*******Schema for Store*************//
//**************************************************************//

var StoreSchema = new mongoose.Schema({
	               storename: {type: String, unique: true,required: true},
              creationdate: { type: Date, default: Date.now,required: true },
                   address: {  streetaddress1:{type: String},
                               streetaddress2:{type: String},
                               city:{type: String},
                               state:{type: String},
                               country:{type: String},
                               zip:{type: String}
                              },
                owneremail: {type: String, unique: true,required: true},
                 agentname: {type: String},
                  password: {type: String,required: true},
               lastupadted: { type: Date, default: Date.now,required: true },
                domainname: {type: String, required: true}
});


module.exports = mongoose.model('Store', StoreSchema);
