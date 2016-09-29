var fs = require('fs');
var USERDATA = __dirname+"/database/user.json";
var util = require('../util/util.js');


var user = {
	getUser : function (req, res) {
		var key = req.param('key');
		fs.readFile(USERDATA, function (err, data) {
			if (!err) {
				try {
					var obj = JSON.parse(data);
					var newObj = [];
					for (var  i in obj) {
						if (obj[i].userid === key) {
							delete obj[i].password;
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
	addUser : function (req, res) {
		var username = req.param('username');
		var password = util.md5(req.param('password'));   
		var tel = req.param('tel');
		var email = req.param('email');
		var partment = req.param('partment');
		var tag = req.param('tag');
		var creater = req.param('creater') || '';

		if (!username || !password || !tel || !email || !partment || !tag ) {
			return res.send({
				status: 0,
				data: "缺少必要参数"
			})
		}

		try {

			var content = JSON.parse(fs.readFileSync(USERDATA));
			var obj = {
				"userid": util.guid(),
				"username": username,
				"password": password,
				"tel": tel,
				"email": email,
				"tag": tag,
				"creater": creater,
				"time": new Date(),
				"token": ''
			};
			content.push(obj);
			fs.writeFileSync(USERDATA, JSON.stringify(content));
			delete obj.password
			return res.send({
				status: 1,
				data: obj
			})

		} catch(e) {
			return res.send({
				status: 1,
				err: e
			});
		}
	},
	login : function (req, res) {
		var email = req.param('email');
		var password = util.md5(req.param('password'));
		var content = JSON.parse(fs.readFileSync(USERDATA))
		for (var i in content) {
				
			if (content[i].email === email && content[i].password === password) {
				return res.send({
					status: 1,
					info: content[i],
				})
			}
				
		}
		return res.send({
			status: 0,
			info: "用户名或密码不正确",
		})
		// var de
	},
	loginByToken : function (req, res) {

	},
	updatePassword : function (req, res) {

	},
	deleteUser : function (req, res) {
		var token = req.param('token');
		var email = req.param('email');

		var content = JSON.parse(fs.readFileSync(USERDATA));
		for (var i in content) {
			if (token === content[i].token) {
				for (var j in content) {
					if (content[j].email === email) {
						content.splice(j, i);
						fs.writeFileSync(USERDATA, JSON.stringify(content));
						return res.send({
							status: 1,
							info: content,
							data: '删除成功'
						})
					}
				}
			}
		}
		return res.send({
			status: 0,
			err: '删除失败'
		});
	}
}

module.exports = user;