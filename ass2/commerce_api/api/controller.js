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
        var cart_item = req.body;
        var uuid = req.params.uuid;
        usercart.putitems(req,res,uuid,cart_item,function(err,response) {
            if(err)
                res.send(err);
            res.send(response);
        });
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