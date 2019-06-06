var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var methotOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var supportRouter = require('./routes/support');
var loginRouter = require('./routes/login');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');
const port = 2000;
const socket = io(http);

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
app.use('/support',supportRouter);
app.use(express.static(path.join(__dirname,'node_modules/socket.io-client/dist/')));
app.use(express.static(path.join(__dirname,'node_modules/mqtt/')));

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
http.listen(port, ()=>{
  console.log("connected to port: "+ port)
  });
socket.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      socket.emit('chat message', msg);
    });
});

module.exports = app;
