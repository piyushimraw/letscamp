var mongoose 	= require ("mongoose");
var mongoDB = 'mongodb://127.0.0.1/letscamp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
	useMongoClient : true
}); 





//get the default connection
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));


module.exports = db;