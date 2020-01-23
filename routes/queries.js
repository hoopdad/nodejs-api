// Connect to DB
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "database-poc-stage1.cnllnvs0hspl.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var getBranches = function () {
        const query = "SELECT * FROM stage1pocDB.Branch";
		return new Promise(function (fulfill, reject) {
			con.query(query, (err, result, fields) => {
                if (err) throw err;
                return fulfill(result);
             });
		});
    }
    module.exports.getBranches = getBranches;

    var searchBranch = function (zipcode) {
        const query = "SELECT * FROM stage1pocDB.Branch WHERE zipcode="+zipcode;
        console.log(query);
		return new Promise(function (fulfill, reject) {
			con.query(query, (err, result, fields) => {
                if (err) throw err;
                return fulfill(result);
             });
		});
    }
    module.exports.searchBranch = searchBranch;

    var editBranch = function (branchDetails) {
      const query = 'UPDATE stage1pocDB.Branch SET zipcode='+branchDetails.zipcode+', address="'+branchDetails.address+'", workingdays="'+branchDetails.workingdays+'", workinghours="'+branchDetails.workinghours+'", description="'+branchDetails.description+'", lastmodifieddtm="'+branchDetails.lastmodifieddtm+'", State="'+branchDetails.State+'" WHERE branchname="'+branchDetails.branchname+'"';
      console.log(query);
  return new Promise(function (fulfill, reject) {
    con.query(query, (err, result, fields) => {
              if (err) throw err;
              return fulfill(result);
           });
  });
  }
  module.exports.editBranch = editBranch;

  });
