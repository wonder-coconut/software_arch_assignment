'use strict'

var product = require('../services/products');
var usercart = require('../services/usercart');
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
    },
    getcartitems : function(req,res) {
        var uuid = req.params.uuid;
        usercart.getitems(req,res,uuid,function(err,cart) {
            if(err)
                res.send(err);
            res.json(cart);
        })
    }
}

module.exports = controllers;