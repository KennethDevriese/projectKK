var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
// var http = require('http').Server(app);
// var io = require('socket.io').listen(http);
// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//     });
// });
router.get('/', function(req, res, next) {
    res.render('support', { title: 'Support' });
});

module.exports = router;