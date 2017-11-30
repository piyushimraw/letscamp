var mongoose 	= require ("mongoose");
const mongoDB =  'mongodb://mogo:admin@ds125146.mlab.com:25146/lets_camp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { 
	useMongoClient : true
}); 





//get the default connection
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));


module.exports = db;