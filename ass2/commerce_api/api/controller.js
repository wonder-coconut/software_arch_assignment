'use strict'

var product = require('../services/products');
const bodyParser = require('body-parser');

var controllers = {
    products : function(req,res) {
        product.list(req,res,function(err, products) {
            if(err)
                res.send(err);
            res.json(products);
        });
    },
    putcartitem : function(req,res) {
        var name = req.body.name;
        res.send('put request for ' + req.params.uuid + ' called\nRequest content name: ' + name + '\n');
    }
}

module.exports = controllers;