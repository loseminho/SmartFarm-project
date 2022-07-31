//모듈 선언 부분
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var testRouter = require('./routes/test');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var listRouter = require('./routes/list');    //board 파일 등록
var mainRouter = require('./routes/main');
var mainchartRouter = require('./routes/mainchart');
var openingRouter = require('./routes/opening');
var sensor1Router = require('./routes/sensor1');
var sensor1chartRouter = require('./routes/sensor1chart');
var sensor2Router = require('./routes/sensor2');
var sensor2chartRouter = require('./routes/sensor2chart');
var sensor3Router = require('./routes/sensor3');
var sensor3chartRouter = require('./routes/sensor3chart');
var sensor4Router = require('./routes/sensor4');
var sensor4chartRouter = require('./routes/sensor4chart');
var sensor5Router = require('./routes/sensor5');
var sensor5chartRouter = require('./routes/sensor5chart');
var sensor6Router = require('./routes/sensor6');
var hwRouter = require('./routes/hw');
var appRouter = require('./routes/app');


//서버 설정 부분
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); /*뷰 엔진 ejs 사용 선언*/


//미들웨어 등록부분
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/list',listRouter);
app.use('/main', mainRouter);
app.use('/mainchart', mainchartRouter);
app.use('/opening', openingRouter);
app.use('/sensor1', sensor1Router);
app.use('/sensor1chart', sensor1chartRouter);
app.use('/sensor2', sensor2Router);
app.use('/sensor2chart', sensor2chartRouter);
app.use('/sensor3', sensor3Router);
app.use('/sensor3chart', sensor3chartRouter);
app.use('/sensor4', sensor4Router);
app.use('/sensor4chart', sensor4chartRouter);
app.use('/sensor5', sensor5Router);
app.use('/sensor5chart', sensor5chartRouter);
app.use('/sensor6', sensor6Router);
app.use('/hw', hwRouter);
app.use('/app', appRouter);

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
