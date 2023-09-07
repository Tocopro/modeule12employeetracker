const mysql = require('mysql2');

// Connect to database
const database = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username and port,
      port: 3306,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'employeeTracker'
    },
    console.log('Connected to the employee database.')
    // handle error

);

module.exports = database;