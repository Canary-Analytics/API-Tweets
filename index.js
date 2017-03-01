const express = require('express');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const Twitter = require('twitter');
const app = express();
const utils = require('./utils/tweets.js');
const client = new Twitter({
  consumer_key: 'aDay6jhWc9b3y3Z31BRx6uXVc',
  consumer_secret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
  access_token_key: '827584840677617664-GCqacrqLnyTUcYUTkHzP4tpwYb7wW5y',
  access_token_secret: '9rPagouJR4nUgbvrgmUQH8EISDEknl0s7ipeBPwuZB8NC'
});

passport.use(new Strategy({
    consumerKey: 'aDay6jhWc9b3y3Z31BRx6uXVc',
    consumerSecret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
    callbackURL: 'http://localhost:8080/login/twitter/return'
  },
  (token, tokenSecret, profile, cb) => {
    return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 8080));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('profile', { user: req.user._json });
});

app.get('/busqueda', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('busqueda', { user: req.user });
});

app.post('/search', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    client.get('search/tweets', { q: req.body.valor.v1 }, (error, tweets, response) => {
      console.log(tweets.statuses);
      console.log("Total: " + utils.resultados(tweets.statuses)[0]);
      console.log("Respuestas: " + utils.resultados(tweets.statuses)[1]);
      console.log("Retweets: " + utils.resultados(tweets.statuses)[2]);
      console.log("Originales: " + utils.resultados(tweets.statuses)[3]);
      console.log("Media/urls: " + utils.resultados(tweets.statuses)[4]);
        res.render('resultados', { estadisticas: utils.resultados(tweets.statuses), resultado: tweets.statuses, user: req.user });
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}`);
});
