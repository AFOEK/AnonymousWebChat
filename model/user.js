
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

userSchema = new schema({
    unique_id: Number,
    student_id: String,
    name: String,
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User', userSchema);