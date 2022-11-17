const mongoose = require('mongoose');
const product = require('../Models/product');

module.exports.add_product_page = (req,res) => {
    res.render('addproduct')
}

module.exports.add_product = (req,res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.originalname
    });
    product.save()
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=>{
        res.status(500).json(err);
    });
};

module.exports.show_product = (req, res) => {
    product.find(function (err, docs) {
        if(!err)
        {
            res.render('showproduct', {
                product : docs
            });
        }
        else
        {
            console.log("Error !" + err);
        }
    });
};


