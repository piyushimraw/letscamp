var express 	= require ("express");
var app 		= express();
var bodyParser  = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

module.exports = app;