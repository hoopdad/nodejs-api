var express = require('express');
var router = express.Router();
const db = require('./queries')

router.all('/*', function (req, res, next) {
	console.warn ("in router.all()");
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-ALlow-Headers","X-Requested-With");
	res.setHeader('Access-Control-Allow-Method', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

// Get all branches
router.get('/branches', function (req, res) {
	console.warn("in /branches");
	db.getBranches().then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

// Get branch of a specific zipcode
router.get('/branch/:zipcode', function (req, res) {
	console.warn("in /branch with zipcode");;
	db.searchBranch(req.params.zipcode).then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

// Edit branch
router.put('/branch', function (req, res) {
	console.warn("in /branch MAO");
	console.warn(req.body);
	db.editBranch(req.body).then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Method', 'PUT, POST, GET, DELETE, OPTIONS');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

module.exports = router;
