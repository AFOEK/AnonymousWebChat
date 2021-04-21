const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1/anonchat')
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Connection to monggose error"));
db.once('open', function (callback) { 
    console.log("Connection success");
 })