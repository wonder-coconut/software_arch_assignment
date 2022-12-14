'use strict'

var sms_in = require('../services/sms_in');
var sms_out = require('../services/sms_out');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

var controllers = {
    sms_inbound : function(req, res) {
        console.log("sms in");
        var input_sms_in = req.body;
        sms_in.parseSMS(req, res, input_sms_in, myCache, function(err, responseJSON) {
            if(err)
                res.send(err);
            res.json(responseJSON);
        });
    },
    sms_outbound : function(req, res) {
        console.log("sms out");
        var input_sms_out = req.body;
        sms_out.parseSMS(req, res, input_sms_out, myCache,function(err, responseJSON) {
            if(err)
                res.send(err);
            res.json(responseJSON);
        });
    }
}

module.exports = controllers;