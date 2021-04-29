var express = require('express');
var router = express.Router();
var path = require('path')
var User = require('../models/user');

router.get('/', function(req,res,next){
    return res.sendFile(path.join(__dirname + '/view/register.html'))
});

router.post('/', function(req,res,next) {
    var data = req.body;

    if(!data.studentid || !data.name || !data.email || !data.password || !data.repassword){
        res.send();
    }else{
        if(data.password == data.repassword){
            User.findOne({studentid:data.studentid}, function(err,data){
                if(!data){
                    var c;
                    User.findOne({},function(err,data){
                        if(data){
                            c = data.unique_id+1;
                        }else{
                            c=1;
                        }
                        var newdata = new User({
                            student_id:data.studentid,
                            name:data.name,
                            email:data.email,
                            password:data.password
                        });
                        newdata.save(function(err,Acc){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Success");
                            }
                        });
                    }).sort({_id: -1}).limit(1);
                    res.send({"Success":"You are regestered,You can login now."});
                }else{
                    res.send({"Success":"Student ID is already exist."});
                }
            });
        }else{
            res.send({"Success":"password is not matched"});
        }
    }
});


router.get('/login', function(req,res,next){
    return res.sendFile(path.join(__dirname+"/view/login.html"));
});

