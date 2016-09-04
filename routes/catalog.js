var express = require('express');
var router = express.Router();
var product = require('../handlers/catalog/product.js');
var productVariant = require('../handlers/catalog/productVariantHandler.js');
var productCategory = require('../handlers/catalog/productCategoryHandler.js');


router.route('/createProduct')
    .post(product.createProduct);
router.route('/updateProductDescription')
    .post(product.updateProductDescription);
router.route('/addproductimage')
    .post(product.addProductImage);
router.route('/createProductVariant')
    .post(productVariant.createProductVariant);
router.route('/createVariantPrice')
    .post(productVariant.createVariantPrice);
router.route('/getproductsbystoreid/:storeid')
    .get(product.getproductsbystoreid);
router.route('/getproductbyid/:productid')
    .get(product.getproductbyid);
router.route('/addProductVarientType')
    .post(product.addProductVarientType);
router.route('/getProductAndVarientbystoreId/:storeid')
    .get(productVariant.getProductAndVarientByStoreid);
router.route('/getProductAndVarientbyproductid/:id')
    .get(product.getproductAndVarientbyproductid);
router.route('/getproductAndVarientbyproductid/:productid')
    .get(product.getproductbyid);
router.route('/createCategory')
    .post(productCategory.createCatergory);
router.route('/createSubCategory')
    .post(productCategory.createSubCategory);
router.route('/deleteCategory')
    .delete(productCategory.deleteCategory);
router.route('/deleteSubCategory')
    .delete(productCategory.deleteSubCategory);
router.route('/getproductcategorytree/:storeid')
    .get(productCategory.getCategoryTree);










module.exports = router;
