var Comment =  require ('./models/comment');
var Campground = require ('./models/campground');



var data = [
	{
		name: "Grands Pyccels",
		image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?auto=format&fit=crop&w=1189&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Sausage bresaola turkey ball tip jowl turducken. Short loin chuck pancetta alcatra kielbasa cupim shoulder corned beef fatback kevin shank spare ribs leberkas buffalo. Cow rump turducken bacon, filet mignon ribeye flank. Pork belly sausage corned beef rump porchetta. Porchetta ham hock pork belly salami."
	},
	{
		name: "Adventurer Destiny",
		image: "https://images.unsplash.com/photo-1508431432310-7fec11a74c59?auto=format&fit=crop&w=925&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		name: "Climbers Paradise",
		image: "https://images.unsplash.com/photo-1503789597747-41de608aca69?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Bacon ipsum dolor amet frankfurter salami shankle landjaeger picanha venison meatloaf jowl pork loin chuck andouille strip steak pig. Shankle salami shoulder, meatball tail chicken pork boudin ham drumstick landjaeger bacon. Pork drumstick ham hock beef ribs beef jerky kevin venison chicken bresaola chuck pig. Chuck corned beef meatball alcatra, bacon cow salami kevin leberkas pancetta tongue short ribs landjaeger."
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