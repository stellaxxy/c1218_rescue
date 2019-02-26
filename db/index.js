const mysql = require('mysql');
const {dbConfig} = require('../config');
const {promisify} = require('util');


const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) {
        console.log('Error connection to MySql db:', error.message)
    } else {
        console.log('MySql connected');
    }

});

connection.query = promisify(connection.query);
module.exports = connection;