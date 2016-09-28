var fs = require('fs');
var USERDATA = __dirname+"/database/user.json";


var user = {
	getUser : function (req, res) {
		var key = req.param('key');
		fs.readFile(USERDATA, function (err, data) {
			if (!err) {
				try {
					var obj = JSON.parse(data);
					var newObj = [];
					for (var  i in obj) {
						if (obj[i].id === key) {
							newObj.push(obj[i]);
						}
					}
					return res.send({
						status: 1,
						data: newObj
					});
				} catch(e) {
					return res.send({
						status: 1,
						err: e
					})
				}
			} else {
				return res.send({
					status: 1,
					err: err
				})
			}
		});

	},
	addUser : function () {

	},
	login : function () {

	},
	loginByToken : function () {

	},
	updatePassword : function () {

	},
	deleteUser : function () {

	}
}

module.exports = user;