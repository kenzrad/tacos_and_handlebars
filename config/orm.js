// Import MySQL connection.
var connection = require("../config/connection.js");

//helper function to convert ??? in queries to a array of strings
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotation
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {

  all: function(tableInput, cb) {
    var queryString = `
        SELECT * 
        FROM ${tableInput};
    `;

    console.log(`orm all query string: ${queryString}`);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create: function(table, cols, vals, cb) {
    var queryString = `
        INSERT INTO ${table} (${cols.toString()}) 
        VALUES (${printQuestionMarks(vals.length)}) 
    `;

    console.log(`orm create query string: ${queryString}`);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // ex. objColVals would be {name: gringo taco, devoured: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = `
        UPDATE ${table}
        SET ${objToSql(objColVals)}
        WHERE ${condition}
    `

    console.log(`orm update query string: ${queryString}`);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (taco.js).
module.exports = orm;
