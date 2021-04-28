const express = require("express");
const mongoose = require("mongoose");
const passport =  require("passport");
const path = require("path");
const bodyParser =  require("body-parser");
const LocalStrat = require("passport-local").Strategy;
const passport_local_mongoose = require("passport-local-mongoose");
var User = require('./model/user');

mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect('mongodb://127.0.0.1/anonchat');

var app=express();
app.set("view options", {layout: true});
app.set('view', path.join(__dirname, 'view'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Do it 4 her !",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('assets'));

passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/signup', function (req,res) {
    res.sendFile(path.join(__dirname+'/view/register.html'));
});

app.get('/chat',isLoggedIn ,function (req,res) {
    res.sendFile(path.join(__dirname+'/view/home.html'));
});

app.post('/signup', function (req,res) {
    const student_id =req.body.student_id
    const password = req.body.password
    User.register(new User({ student_id: student_id }),
        password, function(err, user){
            if(err){
                console.log(err);
                return res.sendFile(path.join(__dirname+'/view/register.html'));
            }
            passport.authenticate("local")(
                req, res, function (){
                    res.sendFile(path.join(__dirname + 'home.html'))
                });
        });
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname+'/view/login.html'));
});

app.post('/login', passport.authenticate("local",{
    successRedirect: '/chat',
    failureRedirect: '/login'
}), function(req,res){
});

app.get('/logout', function (req,res) { 
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticates()) return next();
    res.redirect("/login");
}

const port = process.env.PORT || 4040;
app.listen(port, function () { 
    console.log("Server listened in port 4040")
 })