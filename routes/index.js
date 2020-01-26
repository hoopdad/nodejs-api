var express = require('express');
var cors = require('cors');
app = express();
app.use(cors());
var router = express.Router();
const db = require('./queries')

// Get all branches
router.get('/branches', function (req, res) {
	db.getBranches().then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

// Get branch of a specific zipcode
router.get('/branch/:zipcode', function (req, res) {
	db.searchBranch(req.params.zipcode).then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});


router.options('/branch', function (req, res) {
    cors();
});

// Edit branch
router.put('/branch', function (req, res) {
    cors();
	console.log(req.body);
	db.editBranch(req.body).then(function (data) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(data);
	}).catch(function (ew) {
		res.send(ew);
	});
});

module.exports = router;