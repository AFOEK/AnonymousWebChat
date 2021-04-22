var express = require("express");
var mongoose = require("mongoose");
var passport =  require("passport");
var bodyParser =  require("body-parser");
var LocalStrat = require("passport-local");
var passport_local_mongoose = require("passport-local-mongoose");
var User = require('./models/user');

mongoose.set('useNewUrlParser',true);
mongoose.set('useFindandModify',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect('mongodb://127.0.0.1/anonchat');

var app=express();
app.set("view options", {layout: false});
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Do it 4 her !",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/", function(req,res){
    res.render('index.html')
})

app.get('/signup', function (req,res) {
    res.render('register.html')
})

