var createError = require('http-errors');
var dotenv = require('dotenv')
dotenv.config({ silent: true })
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require("helmet");
var cors = require('cors')

var { RateLimiterMemory } = require('rate-limiter-flexible');

require('dotenv').config()


const passport = require('passport')

const session = require('express-session')
/* const authUser = require('./utils/authPassportLocalStrategy')
passport.use(new LocalStrategy (authUser))
 */
const options = {
  points: 5, // 5 requests
  duration: 1, // per second
}
const rateLimiter = new RateLimiterMemory(options);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aiRouter = require('./routes/ai.js')
var imageRouter=require("./routes/images.js")

var app = express();

var mongoDB = require('./persistence/db.js')

// view engine setup
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(cors())   /// only for devel
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* *********************** PASSPORT ******************** */

app.use(session({
  secret: "12Nic&7aafjkl!!öösldeutschRoemisch360!!23",
  resave: false ,
  saveUninitialized: true ,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".
/* *********************** ROUTER ******************** */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ai',aiRouter)
app.use('/images',imageRouter)

app.use((req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send(JSON.stringify({"error" : "Too Many Requests"}));
    });
});


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

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

module.exports = app;
