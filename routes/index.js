var express = require('express');
var cors=require ("cors");
var router = express.Router();
const db = require('./queries')
var app = express();

app.use(cors());

// Get all branches
router.get('/branches', function (req, res) {
	console.warn("in /branches");
	db.getBranches().then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

// Get branch of a specific zipcode
router.get('/branch/:zipcode', function (req, res) {
	console.warn("in /branch with zipcode");;
	db.searchBranch(req.params.zipcode).then(function (data) {
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
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});
router.options('/branch', function(req, res) {
	console.warn ("in OPTIOns");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
	res.setHeader("Access-Control-Request-Method", "*");
});

module.exports = router;
