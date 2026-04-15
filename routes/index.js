var express = require('express');
var router = express.Router();
const db = require('./queries');

router.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

// Get all branches
router.get('/branches', function (req, res) {
	db.getBranches().then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		res.status(500).send(ew.message || 'Failed to fetch branches');
	});
});

// Get branch of a specific zipcode
router.get('/branch/:zipcode', function (req, res) {
	var zipcode = Number(req.params.zipcode);
	if (!Number.isInteger(zipcode)) {
		return res.status(400).send('Invalid zipcode');
	}
	db.searchBranch(zipcode).then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		res.status(500).send(ew.message || 'Failed to fetch branch');
	});
});


// Edit branch
router.put('/branch', function (req, res) {
	db.editBranch(req.body).then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		res.status(500).send(ew.message || 'Failed to update branch');
	});
});

module.exports = router;
