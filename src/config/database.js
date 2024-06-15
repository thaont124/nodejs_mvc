require('dotenv').config();
//get client
var mysql      = require('mysql2/promise');

// //connect db normal
// var connection = mysql.createConnection({
//     host     : process.env.DB_HOST,
//     port     : process.env.DB_PORT,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
//   });

//connect db use database connection pools
var connection = mysql.createPool({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


  module.exports = connection