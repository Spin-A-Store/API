var express = require('express');
var router = express.Router();
var oauthHandler = require('../handlers/oauth/oauth.js');

router.route('/createApplication')
  .post(oauthHandler.createApplication);



module.exports = router;
