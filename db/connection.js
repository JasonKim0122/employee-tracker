const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'SMUCode2022!',
    database: 'employee_tracker_db'
});

module.exports = db;