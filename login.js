var express = require("express");
var mongoose = require("mongoose");
var passport =  require("passport");
var bodyParser =  require("body-parser");
var LocalStrat = require("passport-local");
var passport_local_mongoose = require("passport-local-mongoose");

mongoose.set('useNewUrlParser')