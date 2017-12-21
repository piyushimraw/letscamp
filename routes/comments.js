var express      =   require("express"),
    router       =   express.Router(),
    Comment     =   require("../models/comment"),
    Campground  =   require("../models/campground");

router.post("/campgrounds/:id/comment",isLoggedIn, function(req, res){
    Comment.create(req.body.data, function(err, comment){
        if(err) console.log(err);
        else{
            Campground.findById(req.params.id, function(err, campground){
                if (err) console.log(err);
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }

            });
        }
    });
});


//==========
// Middleware
//==========

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;