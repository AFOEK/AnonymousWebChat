var express = require("express");
var router = express.Router();
var path = require("path");
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var User = require("../models/user");

router.get("/", function (req, res, next) {
  return res.sendFile(path.join(__dirname + "/view/register.html"));
});

router.post("/", function (req, res, next) {
  var data = req.body;

  if (
    !data.studentid ||
    !data.name ||
    !data.email ||
    !data.password ||
    !data.repassword
  ) {
    res.send();
  } else {
    if (data.password == data.repassword) {
      User.findOne({ studentid: data.studentid }, function (err, data) {
        if (!data) {
          var c;
          User.findOne({}, function (err, data) {
            if (data) {
              c = data.unique_id + 1;
            } else {
              c = 1;
            }
            var newdata = new User({
              studentid: data.studentid,
              name: data.name,
              email: data.email,
              password: data.password,
            });
            newdata.save(function (err, Acc) {
              if (err) {
                console.log(err);
              } else {
                console.log("Success");
              }
            });
          })
            .sort({ _id: -1 }).limit(1);
          res.send({ Success: "You are regestered,You can login now." });
        } else {
          res.send({ Success: "Student ID is already exist." });
        }
      });
    } else {
      res.send({ Success: "password is not matched" });
    }
  }
});

router.get("/login", function (req, res, next) {
  return res.sendFile(path.join(__dirname + "/view/login.html"));
});

router.post("/login", function (req, res, next) {
  User.findOne({ studentid: req.body.studentid }, function (err, acc) {
    if (acc) {
      if (acc.password == req.body.password) {
        req.session.userId = data.unique_id;
        res.send({ Success: "Success!" });
      } else {
        res.send({ Success: "Wrong Password or Student ID !" });
      }
    } else {
      res.send({ Success: "Did you already sign up ?" });
    }
  });
});

router.get('/logout', function (req, res, next) {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get('/home', function(req,res){
    res.sendFile(path.join(__dirname + '/view/home.html'))
});

io.on('connection', (socket) => {
    console.log('User Online');
    socket.on('codeboard-message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message-from-others', msg);
    });
});

module.exports = router;