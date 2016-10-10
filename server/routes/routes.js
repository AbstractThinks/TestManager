var express = require('express');
var router = express.Router();
var user = require('./services/user/user.js');
var article = require('./services/article/article.js');

router.post('/user/get', function (req, res) {
	user.getUser(req, res);
});
router.post('/user/create', function (req, res) {
	user.addUser(req, res);
});
router.post('/user/login', function (req, res) {
	user.login(req, res);
});
router.post('/user/login/token', function (req, res) {
	user.loginByToken(req, res);
});
router.post('/user/password/update', function (req, res) {
	user.updatePassword(req, res);
});
router.post('/user/delete', function (req, res) {
	user.deleteUser(req, res);
});
router.post('/article/get', function (req, res) {
	article.getArticle(req, res);
});
router.post('/article/add', function (req, res) {
	article.addArticle(req, res);
});
router.get('/article/getArticles', function (req, res) {
	article.getArticles(req, res);
});
router.post('/article/updateArticle', function (req, res) {
	article.updateArticle(req, res);
});

module.exports = router;