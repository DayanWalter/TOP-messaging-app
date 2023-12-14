// What is createError for?
const createError = require('http-errors');
// define express(more precise!)
const express = require('express');
// What is cors for?(Multiple req...)
const cors = require('cors');
// What is path for?
const path = require('path');
// What is cookie-parser for?
const cookieParser = require('cookie-parser');
// What is logger for?
const logger = require('morgan');

// Define routes
const indexRouter = require('./routes/index');

// Hide sensible data
require('dotenv').config();

// Define whole app
const app = express();

// Set database up
const mongoose = require('mongoose');
// What is this for?
mongoose.set('strictQuery', false);

// Take local defined db or take db from variable via PaaS
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_URL;

// Connect to db and log err if err is caught
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// Again:?
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use / as starting point for router
app.use('/', indexRouter);

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
  res.send('error');
});

module.exports = app;
