
var mongoose = require("mongoose");
var schema = mongoose.Schema;

userSchema = new schema({
    student_id: String,
    name: String,
    email: String,
    password: String
});
User = mongoose.model('User', userSchema);

module.exports=User;