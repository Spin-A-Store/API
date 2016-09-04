// Load required packages
var Product = require('../../db/models/catalog/product.js');
var ProductManager = require('../../db/models/catalog/productManager.js');
var multer = require('multer');
var mkdirp = require('mkdirp');
var basePath = "C:\\pkhaat\\API\\digitalAssets\\";
var sizeOf = require('image-size');
var dir;
var Promise = require('bluebird');

var mongoose = require('mongoose');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        //callback(null,"C:\\pkhaat\\API\\digitalAssets\\" );
        dir = basePath + req.body.storeid + "\\" + req.body.productid + "\\";
        mkdirp(dir, function(err) {
            if (err) console.error(err)
            callback(null, dir);
        });

    },
    filename: function(req, file, callback) {

        var filename = Date.now() + file.originalname;

        callback(null, filename);
    }
});
var upload = multer({ storage: storage }).array('userPhoto', 2);


// Create endpoint /api/users for POST
exports.createProduct = function(req, res) {


    console.log(req.body.attrs)

    var product = new Product({
        desc: req.body.desc,
        name: req.body.name,
        // category:req.body.category,
        lname: req.body.name.toLowerCase(),
        storeId: req.body.storeId,
        sku: req.body.sku
            //"variants.attrs":req.body.attrs
    });



    product.save(function(err, data) {
        if (err)
            res.send(err);

        res.send(data);
    });
};

exports.updateProductDescription = function(req, res) {

    Product.findOneAndUpdate({
            _id: req.body.productid,
            storeId: req.body.storeId,
            "desc.lang": "en"
        }, { $set: { "desc.$.val": req.body.desc } },
        function(err, data) {
            if (err)
                res.send(err);

            res.send(data);
        });




};



exports.addProductImage = function(req, res) {




    var imgstemp = [];

    var tempImage = {
        img: {
            src: req.body.filepath,
            thumbnailsrc100: req.body.thumbnailsrc100,
            thumbnailsrc50: req.body.thumbnailsrc50,
            thumbnailsrc25: req.body.thumbnailsrc25,

        }
    }
    imgstemp.push(tempImage);

    var tempAssets = { assets: { imgs: imgstemp } }

    // Product.findByIdAndUpdate(req.body.productid, tempAssets, function(err, result){
    Product.findByIdAndUpdate(req.body.productid, { $push: { "assets.imgs": tempImage } }, function(err, result) {
        if (err) {
            console.log(err);
        }

        res.send(result)
    });

};

exports.deleteProductImage = function(req, res) {
    Product.Update(req.body.productid, { $pull: { "assets.imgs": { _id: req.body.arrayelmentid } } }, function(err, result) {
        if (err) {
            console.log(err);
        }

        res.send(result)
    });

}
exports.updateProductImage = function(req, res) {
    //need to be implemeted

}

exports.addProductAttribute = function(req, res) {
    //need to be implemeted

}

exports.updateProductAttribute = function(req, res) {
    //need to be implemeted

}

//Keeping it for refrenece
// exports.addProductVarientType = function(req, res) {

// Product.update({"_id":req.body.productid}, { $set: { "variants.attrs": [] }}).exec()
//   .then(function(data){

// return new Promise(function(resolve, reject){
//     Product.update({"_id":req.body.productid}, { $set: { "variants.attrs": req.body.attrs}},function(error, data){
//       if (error) {
//         reject(err);
//       } else {
//         resolve(data)
//       }
//     });
//   });

//   }).then( function(data){

// res.send(data);

//   }).catch(function(err){
// res.send(err);
//     console.log(err)
//           });
// }

exports.addProductVarientType = function(req, res) {
    console.log(req.body.attrs)
    console.log(req.body.productid)
    Product.findByIdAndUpdate(req.body.productid, { $push: { "variants.attrs": req.body.attrs } }, function(err, result) {
        if (err) {
            console.log(err);
        }

        res.send(result)
    });
}




exports.getproductsbystoreid = function(req, res) {

    Product.find({ storeId: req.params.storeid }, function(err, result) {

        if (err) {
            console.log(err);
        }

        res.send(result)
    })
}


exports.getproductbyid = function(req, res) {


    Product.findById(req.params.productid, function(err, result) {

        if (err) {
            console.log(err);

        }

        res.send(result)
    })


}

exports.getproductAndVarientbyproductid = function(req, res) {

    console.log("inside getproductAndVarientbyproductid" + req.params.id)


    Product.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.params.id) } }, {
                $lookup: {
                    from: "productvariants",
                    localField: "_id",
                    foreignField: "productId",
                    as: "pv"
                }
            }

        ],
        function(err, result) {
            if (err) {
                console.log(err);
            }
            res.send(result[0])
        }


    )


}
