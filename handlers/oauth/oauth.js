// Load required packages
var Oauth = require('../../db/models/oauth.js');

// Create endpoint /api/users for POST
exports.createApplication = function(req, res) {
   
    
    
   
 var oauth = new Oauth.Application({
  title: req.body.title
 });
        
  

  oauth.save(function(err,data) {
   if (err)
    res.send(err);

  res.json(data);
  });
};


