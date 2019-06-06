var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var cron = require('node-cron');
var tempSchema = new mongoose.Schema({temp: Number});
var Temp = mongoose.model('temp', tempSchema);
const { exec } = require('child_process');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var temperatuur = [];
//socket.io
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
  
//connectie met database
mongoose.connect("mongodb+srv://admin:Project123@projectkk-qrdxb.azure.mongodb.net/temperatuur?retryWrites=true", function(err) {
    if (err) throw err;
    console.log("Successfully connected to mongodb");
  });
//timer dat om de minuut onze file execute
cron.schedule('* * * * *',() =>{
  exec('./getData.sh', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    var tempNew = new Temp({temp: stdout});
    tempNew.save(function(err){
      if(err)throw err;
      console.log("temp saved!");
    }); 
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    Temp.find(null, function(err,docs){
    if(err)throw err;
    temperatuur = [];
    for(var i = 0; i< docs.length;i++){
      temperatuur.push(docs[i].temp);
    }
    res.render('index', { temp: temperatuur, title: 'Dataset' });
    });
});

module.exports = router;
