var express = require('express');
var router = express.Router();
const db = require('./queries');
var allowedEditFields = [
	'zipcode',
	'address',
	'workingdays',
	'workinghours',
	'description',
	'lastmodifieddtm',
	'State',
	'branchname'
];

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
		console.error(ew);
		res.status(500).send('Failed to fetch branches');
	});
});

// Get branch of a specific zipcode
router.get('/branch/:zipcode', function (req, res) {
	var zipcode = req.params.zipcode;
	if (!/^\d{5}$/.test(zipcode)) {
		return res.status(400).send('Invalid zipcode');
	}
	db.searchBranch(zipcode).then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		console.error(ew);
		res.status(500).send('Failed to fetch branch');
	});
});


// Edit branch
router.put('/branch', function (req, res) {
	if (!req.body || typeof req.body !== 'object') {
		return res.status(400).send('Invalid request body');
	}

	var fields = Object.keys(req.body);
	var hasUnexpectedFields = fields.some(function (field) {
		return !allowedEditFields.includes(field);
	});

	if (hasUnexpectedFields) {
		return res.status(400).send('Unexpected fields in request body');
	}

	for (var i = 0; i < allowedEditFields.length; i += 1) {
		if (req.body[allowedEditFields[i]] === undefined || req.body[allowedEditFields[i]] === null) {
			return res.status(400).send('Missing required field: ' + allowedEditFields[i]);
		}
	}

	if (typeof req.body.zipcode !== 'string' && typeof req.body.zipcode !== 'number') {
		return res.status(400).send('Invalid zipcode');
	}

	if (!/^\d{5}$/.test(String(req.body.zipcode))) {
		return res.status(400).send('Invalid zipcode');
	}

	db.editBranch(req.body).then(function (data) {
		res.send(data);
	}).catch(function (ew) {
		console.error(ew);
		res.status(500).send('Failed to update branch');
	});
});

module.exports = router;
