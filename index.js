const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();

// Middleware
app.use(cors());

// API
app.get('/api/maplist', (request, response) => {
    const data = require('./dummyData/caselist.json');
    response.send(data);
});


app.get('/api/casedetails', async (req, res) => {
    const query = "SELECT * FROM `cases` AS c WHERE `id`=1"
});


// Listen
app.listen(PORT, HOST, () => {
    console.log('Server running on ' + HOST + ':' + PORT);
}).on('error', (err) => {
    console.log('Server listen error.  You probably already have a server on port: ', PORT);
});

function handleError( response, errorMessage ) {
    let success = false;
    response.send({success, errorMessage});
}