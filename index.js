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


app.get('/api/casedetails', async (request, response) => {
    try {
        const id = request.query.id;

        const query = "SELECT c.`id`, c.`caseType`, c.`city`, c.`street`, c.`zipcode`, \n" +
            "c.`latitude`, c.`longitude`, c.`coverImg`, c.`date`, a.`id` AS animalID, a.`animalType`, a.`name`, a.`breed`,\n" +
            "a.`color`, a.`gender`, a.`size`, a.`description`, GROUP_CONCAT(i.`imgURL`) AS imgURL\n" +
            "FROM `cases` AS c \n" +
            "JOIN `animals` AS a ON a.`id` = c.`animalID` \n" +
            "LEFT OUTER JOIN `images` AS i ON i.`animalID` = a.`id`\n" +
            "WHERE c.`id` = ?\n" +
            "GROUP BY c.`id`";
        const output = {
            success: false
        };
        let data = await db.query(query, [id]);

        response.send({
            success: true,
            data: data
        })
    } catch(error) {
        
    }

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