var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org');
//mqtt
client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
});
     
router.get('/', function(req, res, next) {
    res.render('support', { title: 'Support' });
});

module.exports = router;