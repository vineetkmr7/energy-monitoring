global._config = require('./configs/config');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const mongoose = require('mongoose');

const Routes = require('./routes');

var app = express();

// setup express
require('./configs/express.config')(express, app);

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setting routes
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
app.use('/devices', Routes.Devices);
app.use('/energy', Routes.Energy);
app.use('/users', Routes.Users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', error => {
  console.log('Uncaught Error', error);
});

// Setup DB
// require('./configs/database-connection')(eventEmitter);
const uri = `${_config[_config.node_env].db.host}://${_config[_config.node_env].db.username}:${_config[_config.node_env].db.password}@${_config[_config.node_env].db.cluster}/${_config[_config.node_env].db.name}?retryWrites=true&w=majority`;

// const mongoose = require('mongoose');
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log("Database connected => ", `${_config[_config.node_env].db.name}`);
  eventEmitter.emit('db-connected');
})

eventEmitter.once('db-connected', () => {
  app.emit('ready');
})

module.exports = app;
