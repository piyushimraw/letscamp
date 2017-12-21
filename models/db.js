var mongoose 	= require ("mongoose");
const mongoDB =  'mongodb://localhost:27017/lets_camp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
	useMongoClient : true
}); 





//get the default connection
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));


module.exports = db;