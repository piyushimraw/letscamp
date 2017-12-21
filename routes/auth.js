var express      =   require("express"),
    router       =   express.Router();
    User        =   require("../models/user"),
    passport    =   require("passport");


router.get("/register",function (req, res){
    res.render("register");
});
    
router.post("/register", function(req, res){
    var newUser = new User( {username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function (req, res){
    res.render("login");
});

router.post("/login", function (req, res){
    passport.authenticate("local")(req, res, function(){
        res.redirect("/campgrounds");
    });
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;    