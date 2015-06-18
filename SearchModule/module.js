var exports = module.exports = {};
//Async module to perform parallel task
var async = require("async");
var fs = require("fs");
var finalResult = [];

//Method to find student match in subject files
exports.searchById = function(qId, res) {
	//Subject files to read
	var fileNames = ["./Source/sub_1.json", "./Source/sub_2.json", "./Source/sub_3.json", "./Source/sub_4.json"];
	//async.map will read the subject files in parallel
	async.map(fileNames, 
		function(fname,callback) {
			fs.readFile(fname, callback);
		}, 
		function(err,results) {
			//
			res.writeHead(200);
			res.write("<html><body>");
			//async.parallel will perform task on files read by async.map
			async.parallel(
				//Array of functions which will get execute in parallel manner
				[function(callback) {
					//console.log("1st Func");
					setTimeout(function() {
					   findMatch(JSON.parse(results[0]), qId, res);
					}, 3000);
				},
				function(callback) {
					//console.log("2nd Func");
					findMatch(JSON.parse(results[1]), qId, res);
				},
				function(callback) {
					//console.log("3rd Func");
					setTimeout(function() {
					   findMatch(JSON.parse(results[2]), qId, res, 1);
					}, 6000);
				},
				function(callback) {
					//console.log("4th Func");
					findMatch(JSON.parse(results[3]), qId, res);
				}],
				function(err, result) {
					console.log("[INFO] Final Results : \n" + result);
				}
			);
		}
	);
	//res.end("Done!");
	//return finalResult;
};

function findMatch(jsonData, qId, res, end) {
	var sub_1_json = jsonData;
	var enroll_sub_1 = sub_1_json.enrolledStudents;
	var found = enroll_sub_1.filter(function(value) {
		var studId = value.id;
		if(studId == qId) {
			return value;
		}
	});
	
	//If match found then write it to response
	if(found[0] != null) {
		//finalResult.push({subId: sub_1_json.subjectId, subName: sub_1_json.subjectName, score: found[found.length - 1].score});
		
		res.write("****************************************<br/>");
		res.write("Subject Id: " + sub_1_json.subjectId + "<br/>");
		res.write("Subject Name: " + sub_1_json.subjectName + "<br/>");
		res.write("Student Score: " + found[found.length - 1].score + "<br/>");
		res.write("****************************************<br/>");
		
		console.log("****************************************");
		console.log("Subject Id: " + sub_1_json.subjectId);
		console.log("Subject Name: " + sub_1_json.subjectName);
		console.log("Student Score: " + found[found.length - 1].score);
		console.log("****************************************");
	}
	if(end != null && end == 1) {
		res.write("</body></html>");
		res.end("Done!");
	}
}