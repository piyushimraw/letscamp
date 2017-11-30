var mongoose 	= require ("mongoose");
var mongoDB = 'mongodb://127.0.0.1/letscamp' || 'mongodb://admin:admin@mongod@ds125146.mlab.com:25146/lets_camp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
	useMongoClient : true
}); 





//get the default connection
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));


module.exports = db;