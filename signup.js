const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router =  express.Router();
const app = express();
const path = require("path");


mongoose.connect('mongodb://127.0.0.1/anonchat')
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Connection to monggose error"));
db.once('open', function (callback) { 
    console.log("Connection success");
 })

app.set('view', path.join(__dirname, 'view'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view options", {layout: false});
router.get('/',(req,res) => {
    res.sendFile("index.html");
});

router.post('/signup',(req,res)=>{
    var name =  req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var student_id = req.body.student_id;

    var data = {
        "student_id": student_id,
        "name": name,
        "email": email,
        "password": password,
    }

    db.collection('account').insertOne(data, function(err, collection){
        if(err) throw err;
        console.log("Record are inserted successfully");
    });
    return res.redirect('index.html');
});

app.get('/', function (req, res) { 
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html')
 }).listen(4040)

 console.log("Server are listen at port 4040")