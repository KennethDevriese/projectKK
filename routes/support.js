var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var mqtt = require('mqtt');
     
router.get('/', function(req, res, next) {
    res.render('support', { title: 'Support' });
});

module.exports = router;