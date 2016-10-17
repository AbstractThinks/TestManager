var fs = require('fs');
var util = require('../../util/util.js');
var USERDATA = __dirname+"/user.json";

var user = {
	getUser : function (req, res) {
		var key = req.param('key');
		fs.readFile(USERDATA, function (err, data) {
			if (!err) {
				try {
					var obj = JSON.parse(data);
					var newObj = [];
					
					newObj.push(obj[0]);

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
	}
}

module.exports = user;