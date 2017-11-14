var app 		= require('./server');
var Campground 	= require ('./models/campground');
var Comment 	= require ('./models/comment');
var seedDB		= require('./seeds');


seedDB();
app.get("/", function(req, res){
	res.render("landing")
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else {
			res.render("index", {campgrounds : allcampgrounds});
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

app.post('/campgrounds/:id/comment', function(req, res){
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


app.listen("8080","127.0.0.1",function () {
	// body...
	console.log("Let'sCamp server has restarted");
});