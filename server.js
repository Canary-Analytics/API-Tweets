const express = require('express');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const Twitter = require('twitter');
const app = express();
let client;

passport.use(new Strategy({
        consumerKey: 'aDay6jhWc9b3y3Z31BRx6uXVc',
        consumerSecret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
        callbackURL: 'http://localhost:8080/login/twitter/return'
    },
    (token, tokenSecret, profile, cb) => {
        client = new Twitter({
            consumer_key: 'aDay6jhWc9b3y3Z31BRx6uXVc',
            consumer_secret: '6vbURPCBJSSQakw2t6eHvAY01HBong3rjnQbtGcr34ZNateN0s',
            access_token_key: '827584840677617664-GCqacrqLnyTUcYUTkHzP4tpwYb7wW5y',
            access_token_secret: '9rPagouJR4nUgbvrgmUQH8EISDEknl0s7ipeBPwuZB8NC'
        });

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
  res.render('login');
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('profile', { user: req.user });
});

app.get('/busqueda', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('busqueda');
});

app.post('/search', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    console.log("Valor 1: " + req.body.valor.v1);
    client.get('search/tweets', {
        q: req.body.valor.v1
    }, (error, tweets, response) => {
        for (var i = 0; i < tweets.statuses.length; i++) {
            console.log(tweets.statuses[i].user.screen_name);
        }
    });
})

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
