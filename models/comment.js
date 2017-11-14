var mongoose =  require ('mongoose');
var db = require ('./db');
var Schema = mongoose.Schema;
var commentSchema = new Schema(
		{
			text: String,
			author: String
		}
	);
module.exports =  commentSchema;
module.exports = mongoose.model('Comment', commentSchema);