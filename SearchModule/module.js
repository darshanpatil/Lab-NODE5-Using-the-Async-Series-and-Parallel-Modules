var exports = module.exports = {};
var async = require("async");
var fs = require("fs");
var finalResult = [];

exports.searchById = function(qId, res) {
	var fileNames = ["./Source/sub_1.json", "./Source/sub_2.json", "./Source/sub_3.json", "./Source/sub_4.json"];
	async.map(fileNames, function(fname,callback) {
		fs.readFile(fname, callback);
	}, function(err,results) {
		//console.log(JSON.parse(results[0]));
		//console.log(err ? err : results);
		res.writeHead(200);
		res.write("<html><body>");
		async.parallel(
		[function(callback) {
			//console.log("1st Func");
			findMatch(JSON.parse(results[0]), qId, res);
		},
		function(callback) {
			//console.log("2nd Func");
			findMatch(JSON.parse(results[1]), qId, res);
		},
		function(callback) {
			//console.log("3rd Func");
			findMatch(JSON.parse(results[2]), qId, res);
		},
		function(callback) {
			//console.log("4th Func");
			findMatch(JSON.parse(results[3]), qId, res, 1);
		}],
		function(err, result) {
			console.log("[INFO] Final Results : \n" + result);
		});
	});
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

/*
exports.searchById = function(qId) {
	var fileNames = ["../Source/sub_1.json", "../Source/sub_2.json", "../Source/sub_3.json", "../Source/sub_4.json"];
	async.map(fileNames, fs.readFile, function(err, data) {
		
		async.parallel(
		[function(callback) {
			console.log("1st Func");
			//console.log(data[0]);
			var sub_1_json = JSON.parse(data[0]);
			//console.log(sub_1_json);
		},
		function(callback) {
			console.log("2nd Func");
			var sub_2_json = JSON.parse(data[1]);
			console.log(sub_2_json);
		},
		function(callback) {
			console.log("3rd Func");
			var sub_3_json = JSON.parse(data[2]);
			console.log(sub_3_json);
		},
		function(callback) {
			console.log("4th Func");
			var sub_4_json = JSON.parse(data[3]);
			console.log(sub_4_json);
		}],
		function(err, rusult) {
			//console.log(result);
		});
	});
};*/