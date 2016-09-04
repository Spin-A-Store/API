// Load required packages
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');




// Define our user schema
var ProductSchema = new mongoose.Schema({
    "storeId": { type: String, required: true },
    "desc": {
        type: [{
            lang: { type: String, required: true },
            val: { type: String, required: true }
        }],
        validate: [arrayLimit, '{PATH} minimum one language discrption required']
    },
    "sku": { type: String, required: true },
    "name": { type: String, required: true },
    "lname": { type: String, required: true },
    "assets": {
        imgs: {
            type: [{
                img: {
                    "height": { type: String },
                    "src": { type: String },
                    "width": { type: String },
                    "thumbnailsrc": { type: String },
                    "thumbnailsrc100": { type: String },
                    "thumbnailsrc50": { type: String },
                    "thumbnailsrc25": { type: String },
                }
            }]
        }

    },

    "category": { type: String },

    "variants": {
        cnt: { type: Number },
        attrs: {
            type: [{
                "name": { type: String },

                "values": { type: [{ type: String }] }
            }]
        }
    }


    /* "name":{type: String,required: true} ,
     "lname":{type: String,required: true} ,
     "category":{type: String,required: true} ,
     "brand":{
              id:{type: String,required: true},
              name:{type: String,required: true},
              src:{type: String,required: true}

             },
         "assets":{
              imgs:{type:[{img:{"height":{type: String},
                                "src":{type: String},
                                "width":{type: String}
                               }
                          }
                         ]
                   }

               }

       "shipping":{
                    dimensions:{
                        "height":{type: String},
                        "length":{type: String},
                         "width":{type: String}
                    },
                    weight:{type: String}
                  },
       "specs":{
               type:[
                   "name":{type: String},
                   "val":{type: String}
               ]
               },
       "variants":{
                    cnt:{type: Number,required: true},
                    attrs:{
                          type:[
                           "dispType":{type: String},
                           "name":{type: String}
                                ]}
                  }
       */

});

function arrayLimit(val) {
    return val.length > 0;
}

module.exports = mongoose.model('Product', ProductSchema);
