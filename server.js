var http = require("http");
var url = require("url");
//Read student.json file
var studentJ = require("./Source/student.json");
//Import custom modules
var idModule = require("./IdModule/module.js");
var searchModule = require("./SearchModule/module.js");
//Constant for port on which server is running
const PORT = 9090;

//Create simple HTTP server
var server = http.createServer(handleRequest);

//Function for HTTP request handling
function handleRequest(req, res) {
	var student = studentJ.students;
	var reqMethod = req.method;
	
	//Proceed only if request method is 'GET'
	if(reqMethod != 'GET') {
		res.writeHead(500);
		res.end("Request method " + reqMethod + " not supported");
	}
	var query = url.parse(req.url, true).query;
	
	//Email parameter from request
	var qEmail = query.qEmail;
	
	//Call IdModule to get id from JSON for requested email
	var qId = idModule.getId(qEmail, student);

	//If qId is null then return 404 http status as response
	//No student with email id exist in system
	if(qId == null) {
		res.writeHead(404);
		res.end("Student with email '" + qEmail + "' is not registered");
		return;
	}
	
	//Call SearchModule to get subject details for respective student
	var result = searchModule.searchById(qId, res);
	
	//Write response header as 200 OK and return searched data
	//res.writeHead(200);
	//res.end(qId.toString());
}

//Start server on @PORT
server.listen(PORT, function() {
	console.log("[INFO] Server started on " + PORT);
});