// Connect to DB
var mysql = require('mysql');

var con = mysql.createConnection({
	host: process.env.DB_HOST || 'database-poc-stage1.cnllnvs0hspl.us-east-2.rds.amazonaws.com',
	user: process.env.DB_USER || 'admin',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'stage1pocDB'
});

var connectionError = null;

con.connect(function (err) {
	if (err) {
		connectionError = err;
		console.error('Database connection failed:', err.message);
		return;
	}
	console.warn('Connected!');
});

function runQuery(query, params) {
	return new Promise(function (fulfill, reject) {
		if (connectionError) {
			return reject(connectionError);
		}

		con.query(query, params, function (err, result) {
			if (err) {
				return reject(err);
			}
			return fulfill(result);
		});
	});
}

function getBranches() {
	return runQuery('SELECT branchname, zipcode, address, workingdays, workinghours, description, lastmodifieddtm, State FROM Branch');
}
module.exports.getBranches = getBranches;

function searchBranch(zipcode) {
	return runQuery(
		'SELECT branchname, zipcode, address, workingdays, workinghours, description, lastmodifieddtm, State FROM Branch WHERE zipcode = ?',
		[zipcode]
	);
}
module.exports.searchBranch = searchBranch;

function editBranch(branchDetails) {
	return runQuery(
		'UPDATE Branch SET zipcode = ?, address = ?, workingdays = ?, workinghours = ?, description = ?, lastmodifieddtm = ?, State = ? WHERE branchname = ?',
		[
			branchDetails.zipcode,
			branchDetails.address,
			branchDetails.workingdays,
			branchDetails.workinghours,
			branchDetails.description,
			branchDetails.lastmodifieddtm,
			branchDetails.State,
			branchDetails.branchname
		]
	);
}
module.exports.editBranch = editBranch;
