var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { db } = require('./config/database');
const customLogger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var moviesRouter = require('./routes/movies');
var reviewsRouter = require('./routes/reviews');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(customLogger);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);
// app.use('/api/movies', moviesRouter);
// app.use('/api/reviews', reviewsRouter);
app.use('/api/movies',auth.verifyUserToken, moviesRouter);
app.use('/api/reviews', auth.verifyUserToken,reviewsRouter);

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
