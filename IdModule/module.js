var exports = module.exports = {};

//getId method to return id of student for email
exports.getId = function(qEmail, student) {
	var qId = student.filter(filterJSON);
	
	function filterJSON(value) {
		var email = value.email;
		//Case insensitive email match
		if(email.toUpperCase() == qEmail.toUpperCase()) {
			console.log("[INFO] Email match found");
			console.log("[INFO] Id of student: " + value.id);
			return value.id;
		}
	}
	return qId;
};