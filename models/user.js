var mongoose = require("mongoose");
var localStrategy =  require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(localStrategy);

module.exports= mongoose.model("User", UserSchema);
