const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();

// Middleware
app.use(cors());

// API
app.get('/api/maplist', (req, res) => {
    res.send('Hello MapList');
});

// Listen
app.listen(PORT, HOST, () => {
    console.log('Server running on ' + HOST + ':' + PORT);
}).on('error', (err) => {
    console.log('Server listen error.  You probably already have a server on port: ', PORT);
});