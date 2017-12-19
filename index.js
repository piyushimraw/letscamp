var app 		= require('./server');
var Campground 	= require ('./models/campground');
var Comment 	= require ('./models/comment');
var seedDB		= require('./seeds');
var User		= require("./models/user");
var passport	= require("passport");


seedDB();
app.get("/", function(req, res){
	res.render("landing")
});

app.get("/campgrounds", function(req, res){
	console.log(req.user);
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else {
			res.render("index", {campgrounds : allcampgrounds, currentUser :  req.user});
		}
	});
	
});

app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = { name: name, image: image, description : description };

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

app.get("/campgrounds/:id", function(req, res){
	//caputure the id
	id = req.params.id;
	Campground.findById(id).populate('comments').exec (function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", { foundCampground : foundCampground });
		}
	})
});

app.post('/campgrounds/:id/comment',isLoggedIn, function(req, res){
	Comment.create(req.body.data, function(err, comment){
		if(err) console.log(err);
		else{
			Campground.findById(req.params.id, function(err, campground){
				if (err) console.log(err);
				else{
					campground.comments.push(comment._id);
					campground.save();
					res.redirect('/campgrounds/'+req.params.id);
				}

			});
		}
	});
});

//================
//AUTH Routes
//================

app.get("/register",function (req, res){
	res.render('register');
});

//sign in post route

app.post("/register", function(req, res){
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

app.get("/login", function (req, res){
	res.render("login");
});

app.post("/login", function (req, res){
	passport.authenticate("local")(req, res, function(){
		res.redirect("/campgrounds");
	});
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

//=========
//middleware
//===========

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

const port = process.env.PORT || 8080;
const ip = process.env.IP || "localhost";
app.listen(port ,function (arguments) {
	// body...
	console.log("Let'sCamp server has restarted");
});