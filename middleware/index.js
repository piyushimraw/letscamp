var Campground = require ("../models/campground"),
    Comment    = require ("../models/comment");
var middleware = {};

middleware.isLoggedIn  = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login to do this operation");
    res.redirect("/login");
};

middleware.isCommentAuth = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.send("you cant do this operation");
                }
            }
        });
        
    }else
    {
        res.redirect("/login");
    }
};


middleware.isCampgroundAuth = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                }else{
                    res.send("you cant do this operation");
                }
            }
        });
        
    }else
    {
        res.redirect("/login");
    }
};

module.exports = middleware;
    
