// Load required packages
var User = require('../../db/models/users.js');

// Create endpoint /api/users for POST
exports.createUsers = function(req, res) {
    console.log("userID"+req.body);
    console.log("password"+req.body.password);
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
   var user = new User({
    username: "sdada"
  }); 
  User.find({
    username: "sdada"
  },function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};
