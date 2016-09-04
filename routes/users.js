var express = require('express');
var router = express.Router();
var userHandler = require('../handlers/users/users.js');


router.route('/createUser')
    .post(userHandler.createUsers);

router.route('/getuser')
    .post(userHandler.getUsers);




module.exports = router;
