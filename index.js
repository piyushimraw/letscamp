var app 	= require("./server"),
	seedDB	= require("./seeds");

seedDB();
//routes
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes	 = require("./routes/comments"),
	authRoutes		 = require("./routes/auth");

app.use("/",campgroundRoutes);
app.use("/",commentRoutes);
app.use("/",authRoutes);

const port = process.env.PORT || 8080;
const ip = process.env.IP || "localhost";
app.listen(port ,function (arguments) {
	// body...
	console.log("Let'sCamp server has restarted");
});