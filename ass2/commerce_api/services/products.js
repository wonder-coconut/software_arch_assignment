const productlist = require('../db/products.json');

var products = {
    list : function(req,res) {
        console.log('received product request');
        res.json(productlist);
    }
}

module.exports = products;