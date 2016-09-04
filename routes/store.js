var express = require('express');
var router = express.Router();
var storeHandler = require('../handlers/store/storeHandler.js');


router.route('/registerStore')
    .post(storeHandler.registerStore);

router.route('/storeAdminAuthentication')
    .post(storeHandler.storeAdminAuthentication);


router.route('/getStoreDetailsbyOwnerEmail/:owneremail')
    .get(storeHandler.getStoreDetailsbyOwnerEmail);




module.exports = router;
