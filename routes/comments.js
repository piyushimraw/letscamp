var express      =   require("express"),
    router       =   express.Router(),
    Comment     =   require("../models/comment"),
    Campground  =   require("../models/campground");
var middleware  =   require("../middleware/index");

router.post("/campgrounds/:id/comment",middleware.isLoggedIn, function(req, res){
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

//comment edit route
router.get("/campgrounds/:id/comment/:comment_id/edit",middleware.isCommentAuth, function(req, res){
    Campground.findById(req.params.id, function (err, foundCampground){
        if(err){
            res.send(err);
        }
        else {
            Comment.findById(req.params.comment_id, function(err, comment){
                if(err){
                    res.send(err);
                }
                else {
                    res.render("editComment",{foundCampground : foundCampground, comment:comment});     
                }
            });
        }
    });
});

router.put("/campgrounds/:id/comment/:comment_id",middleware.isCommentAuth, function (req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.data, function(err, comment){
        if(err){
            res.send("some error occured" + req.body.data.text + req.params.comment_id+ comment);
        }else{
            req.flash("success", "Comment Edited");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//comment delete route
router.delete("/campgrounds/:id/comment/:comment_id",middleware.isCommentAuth, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.send(err);
        }
        else {
            req.flash("error", "Comment Deleted");
            res.redirect("back");
        }
    });
});




module.exports = router;