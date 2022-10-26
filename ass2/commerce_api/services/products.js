const productlist = require('../db/products.json');

var products = {
    list : function(req,res) {
        res.json(productlist);
    }
}

module.exports = products;