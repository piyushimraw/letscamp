var mongoose =  require ("mongoose");
var db		 =  require ("./db");
var Schema 	 = mongoose.Schema;
var commentSchema = new Schema(
    {
        text: String,
        author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    }
);
// module.exports =  commentSchema;
module.exports = mongoose.model("Comment", commentSchema);