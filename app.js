var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var methotOverride = require('method-override');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require("fs");

var tempSchema = new mongoose.Schema({temp: Number});
var Temp = mongoose.model('temp', tempSchema);
//herlaad elke minuut
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
mongoose.connect("mongodb+srv://admin:Project123@projectkk-qrdxb.azure.mongodb.net/temperatuur?retryWrites=true", function(err) {
    if (err) throw err;
    console.log("Successfully connected to mongodb");

});
//weergeven database
Temp.find(null, function(err,docs){
  if(err)throw err;
  console.log(docs);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
