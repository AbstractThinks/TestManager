var fs = require('fs');
var ARTICLEDATA = __dirname+"/database/article.json";
var user = require('../user/user.js');
var util = require('../util/util.js');


var article = {
	getArticle : function (req, res) {
		var key = req.param('key');
		fs.readFile(ARTICLEDATA, function (err, data) {
			if (!err) {
				try {
					var obj = JSON.parse(data);
					var newObj = [];
					for (var  i in obj) {
						if (obj[i].articleid === key) {
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
	getArticles : function (req, res) {
		var key = req.param('key');
		fs.readFile(ARTICLEDATA, function (err, data) {
			if (!err) {
				try {
					var obj = JSON.parse(data);
					var newObj = [];
					newObj = obj
					return res.send({
						status: 1,
						data: newObj
					});
				} catch(e) {
					return res.send({
						status: 0,
						err: e
					})
				}
			} else {
				return res.send({
					status: 0,
					err: err
				})
			}
		});

	},
	addArticle : function (req, res) {
		var articlename = req.param('articlename');  
		var articleprice = req.param('articleprice');
		var praise = req.param('praise');  
		var reverse = req.param('reverse');
		if (!articlename || !articleprice ) {
			return res.send({
				status: 0,
				data: "缺少必要参数"
			})
		}

		try {

			var content = JSON.parse(fs.readFileSync(ARTICLEDATA));
			var obj = {
				"articleid": util.guid(),
				"articlename": articlename,
				"articleprice": articleprice,
				"praise": [],
				"reverse": []
			};
			content.push(obj);
			fs.writeFileSync(ARTICLEDATA, JSON.stringify(content));
			delete obj.password
			return res.send({
				status: 1,
				data: obj
			})

		} catch(e) {
			return res.send({
				status: 0,
				err: e
			});
		}
	},
	
	updateArticle : function (req, res) {
		var key = req.param('key');
		var articlename = req.param('articlename');  
		var articleprice = req.param('articleprice');
		var praise = req.param('praise');  
		var reverse = req.param('reverse');
		var content = JSON.parse(fs.readFileSync(ARTICLEDATA));
		for (var i in content) {
			if (key === content[i].articleid) {
				if (praise) {
					if (!content[i].praise) {
						content[i].praise = []
					}
					content[i].praise.push(praise)
					if (content[i].praise.length !== 0 && content[i].praise.length % 10 === 0) {
						var num = (content[i].praise.length / 10) - 1;
						var money = 50 / (num * 10) 
						if (num > 0) {
							for (var i = 0; i < ( num * 10 - 1 ); i++) {
								user.updateMoney(content[i].praise[i], money)
							}
						}
			
					}
				}
				if (reverse) {
					if (!content[i].reverse) {
						user
						content[i].reverse = []
					}
					content[i].reverse.push(reverse)
				}	
			}
		}
		fs.writeFileSync(ARTICLEDATA, JSON.stringify(content));
		return res.send({
			status: 1,
			data: "成功"
		})
	},
	
}

module.exports = article;