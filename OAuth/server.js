var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
const Twitter = require('twitter');
var client;

passport.use(new Strategy({
    consumerKey: 'aDay6jhWc9b3y3Z31BRx6uXVc',
    consumerSecret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
    callbackURL: 'http://localhost:8080/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    client = new Twitter({
      consumer_key: 'aDay6jhWc9b3y3Z31BRx6uXVc',
      consumer_secret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
      access_token_key: token,
      access_token_secret: tokenSecret
    });

    return cb(null, profile);
  }));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    const params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        res.render('profile', { tweet: tweets});
      }
    });
  });

app.listen(8080);
