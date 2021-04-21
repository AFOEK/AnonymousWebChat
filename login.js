var express = require("express");
var mongoose = require("mongoose");
var passport =  require("passport");
var bodyParser =  require("body-parser");
var LocalStrat = require("passport-local");
var passport_local_mongoose = require("passport-local-mongoose");

mongoose.set('useNewUrlParser',true);
mongoose.set('useFindandModify',true);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect('mongodb://127.0.0.1/anonchat');