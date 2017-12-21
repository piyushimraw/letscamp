var express 	    = require ("express");
var app 		    = express();
var bodyParser      = require("body-parser"),
    passport        = require ("passport"),
    LocalStrategy   = require ("passport-local");

var User            = require ("./models/user");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(require ("express-session") ({
    secret : "jfdklasjf920u309jdfijas900239jufjjfdcjiodja892u99u9u98iiu((((hfouduu8euer98uewu",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    next();
});


module.exports = app;


