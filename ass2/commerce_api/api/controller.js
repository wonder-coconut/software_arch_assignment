'use strict'

//var products = require('../db/products.json');
const bodyParser = require('body-parser');

var controllers = {
    putcartitem : function(req,res) {
        var name = req.body.name;
        res.send('put request for ' + req.params.uuid + ' called\nRequest content name: ' + name + '\n');
    }
}

module.exports = controllers;