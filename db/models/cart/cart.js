// Load required packages
var mongoose = require('mongoose');


// Define our user schema
var CartSchema = new mongoose.Schema({
  items:[{productid:{ type: String},
          qualtity:{type: String},
            lastupadted:{ type: Date, default: Date.now,required: true }
         }
        ],
      lastupadted:{ type: Date, default: Date.now,required: true }    
});

// Export the Mongoose model
module.exports = mongoose.model('Cart', CartSchema);
