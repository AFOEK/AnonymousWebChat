var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var User = require('./model/user');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/anonchat',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, (err)=>{
    if(!err){
        console.log("Database are connected");
    }else{
        console.log("Error connect to data base");
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error:"));
db.once('open',function(){

});

app.set("view options", {layout: true});
app.set('view', path.join(__dirname, 'view'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Do it 4 her !",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

var index = require('./routes/route')

app.use(function (req,res,next) {
    var err = new Error('File Not Found');
    err.status  = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

const PORT = process.env.PORT || process.env.YOUR_PORT || 4040;
app.listen(PORT, function () {
  console.log('Server is started on http://localhost:'+PORT);
});