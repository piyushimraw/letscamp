var express 	= require ("express");
var app 		= express();
var bodyParser  = require("body-parser");
var mongoose 	= require ("mongoose");

var mongoDB = 'mongodb://127.0.0.1/letscamp';

mongoose.connect(mongoDB, { 
	useMongoClient : true
}); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




// var campgrounds = [
// 		{name: "Okhala", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
// 		{name: "River's Dawn", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
// 		{name: "Bird's Paradise", image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg"},
// 		{name: "Adventure Rocks", image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg"}, 
// 	]

//get the default connection
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));

//defining schema
var Schema = mongoose.Schema;
var campgroundsSchema  = new Schema ({
	name : String,
	image : String
});


//compile model from schema 
var Campground = mongoose.model('campgrounds', campgroundsSchema);

//inserting record into collection 
// Campground.create({
// 	name: 'Awesome Place',
// 	image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'
// }, function(err, campground) {
// 	if(err) console.log(err);
// 	else{
// 		console.log(campground);
// 	}
// });


app.get("/", function(req, res){
	res.render("landing")
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		}else {
			res.render("campgrounds", {campgrounds : allcampgrounds});
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

	var newCampground = {name: name, image: image};
	//adding campground to database
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			//redirect back  to cammpgrounds
			res.redirect("/campgrounds");
		}
	});

});




app.listen("8080","127.0.0.1",function () {
	// body...
	console.log("Let'sCamp server has restarted");
});