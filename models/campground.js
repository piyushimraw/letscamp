var mongoose = require ("mongoose");
var db = require ("./db");

/*var mongoose = require ('mongoose');*/

var Schema = mongoose.Schema;
var campgroundsSchema  = new Schema ({
    name : String,
    image : String,
    description : String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
	
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


//compile model from schema  
module.exports = mongoose.model("campgrounds", campgroundsSchema);
