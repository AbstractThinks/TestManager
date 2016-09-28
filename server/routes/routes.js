var express = require('express');
var router = express.Router();
var user = require('./services/user/user.js');

router.post('/user/get', function (req, res) {
	user.getUser(req, res);
});
router.post('/user/create', user.addUser);
router.post('/user/login', user.login);
router.post('/user/login/token', user.loginByToken);
router.post('/user/password/update', user.updatePassword);
router.post('/user/delete', user.deleteUser);

module.exports = router;