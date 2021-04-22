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
});

app.get('/signup', function (req,res) {
    res.render('register.html');
});

app.get('/chat',isLoggedIn ,function (req,res) {
    res.render('home.html');
});

app.post('/register', function (req,res) {
    var student_id =req.body.student_id
    var password = req.body.password
    User.register(new User({ student_id: student_id }),
        password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register.html');
            }
            passport.authenticate("local")(
                req, res, function (){
                    res.render('home.html');
                });
        });
});

app.get('/login', function(req,res){
    res.render('login.html')
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

var port = process.env.PORT || 4040;
app.listen(port, function () { 
    console.log("Server listened in port 4040")
 })