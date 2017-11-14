var Comment =  require ('./models/comment');
var Campground = require ('./models/campground');



var data = [
	{
		name: "Grands Pyccels",
		image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?auto=format&fit=crop&w=1189&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Blip Blop Bloop"
	},
	{
		name: "Adventurer Destiny",
		image: "https://images.unsplash.com/photo-1508431432310-7fec11a74c59?auto=format&fit=crop&w=925&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Hahahahahahaah"
	},
	{
		name: "Climbers Paradise",
		image: "https://images.unsplash.com/photo-1503789597747-41de608aca69?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "go climbers go"
	}

];

var seedDB = function (){
	//remove all the campgrounds
	Campground.remove({}, function(err){
		if (err) console.log(err);
		else {
				console.log('Campgrounds removed');
				//add a few campgrounds
				data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err) console.log(err);
						else {
							//add a few comments
							console.log('campground added');
							Comment.create(
							{
								text: "Great place but no wifi",
								author: "Tyrell"

							}, function(err, comment){
								if(err) console.log(err);
								else{
									campground.comments.push(comment);
									campground.save();
								}

							});
						}
					});
				});
			}
	});

}

module.exports = seedDB;