var express      =   require("express"),
    router       =   express.Router(),
    Campground  =   require("../models/campground");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/campgrounds", function(req, res){
    console.log(req.user);
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else {
            res.render("index", {campgrounds : allcampgrounds, currentUser :  req.user});
        }
    });
	
});

router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("new");
});

router.post("/campgrounds",isLoggedIn, function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var id          = req.user._id;
    var username    = req.user.username;
    console.log(id+username);
    var newCampground = { 
        
        name: name, 
        image: image, 
        description : description, 
        author:{id: id, username: username}  
    };

    //adding campground to database
    Campground.create(newCampground, function(err, campground){
        if(err){
            //if error happens handle error
            console.log(err);
        }
        else{
            //redirect back  to cammpgrounds
            res.redirect("/campgrounds");
        }
    });

});

router.get("/campgrounds/:id", function(req, res){
    //caputure the id
    id = req.params.id;
    Campground.findById(id).populate("comments").exec (function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", { foundCampground : foundCampground });
        }
    });
});

//update routes
router.get("/campgrounds/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds/:id");
        }else{
            res.render("editcampground", {foundCampground : foundCampground});
        }
    });
});

router.put("/campgrounds/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, editedCampground){
        if(err){
            res.redirect("/campgrounds/"+req.params.id+"/edit");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DESTROY campgroud route
router.delete("/campgrounds/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports =  router;