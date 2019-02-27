const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();

const CASELIST_FILTERS = [
    {
        param: 'case_type',
        validValues: ['lost','found'],
        sqlCriteria: 'c.`caseType` = ?'
    }
];

// Middleware
app.use(cors());

// API
app.get('/api/caselist', async (request, response) => {
    try {
        let sql = "SELECT \
                        c.`id`, \
                        a.`animalType` AS `typeOfAnimal`, \
                        c.`caseType` AS `typeOfCase`, \
                        c.`city`, \
                        c.`street`, \
                        c.`zipcode` AS `zipCode`, \
                        c.`latitude`, \
                        c.`longitude`, \
                        c.`coverImg` \
                    FROM `cases` c \
                    INNER JOIN `animals` a ON c.`animalID` = a.`id`";

        const filter_criteria = [];
        const filter_values = [];
        CASELIST_FILTERS.forEach(filter => {
            if (request.query.hasOwnProperty(filter.param)) {
                const value = request.query[filter.param];
                if (filter.validValues !== null && filter.validValues.indexOf(value) === -1) {
                    throw new Error(`Invalid value [${value}] for parameter [${filter.param}].  Valid values are: [${filter.validValues}]`);
                }
                filter_criteria.push(filter.sqlCriteria);
                filter_values.push(value);
            }
        });

        if (filter_criteria.length) {
            sql = sql + ' WHERE ' + filter_criteria.join(' AND ');
        }

        const data = await db.query( sql, filter_values );
        data.forEach(row => {
            row.location = {
                city: row.city,
                street: row.street,
                zipCode: row.zipCode,
                latitude: row.latitude,
                longitude: row.longitude
            };

            delete row.city;
            delete row.street;
            delete row.zipCode;
            delete row.latitude;
            delete row.longitude;
        });

        response.send({success: true, data});
    } catch (error) {
        handleError(response, error.message);
    }
});


app.get('/api/casedetails', async (request, response) => {
    try {
        const id = request.query.id;
        if(id === undefined){
            throw new Error(`Please provide a valid ID`);
        } else if(isNaN(id)){
            throw new Error(`ID must be a number`);
        }

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

        if(data.length === 1){
            data = data[0];
            data.location = {
                city: data.city,
                street: data.street,
                zipcode: data.zipcode,
                latitude: data.latitude,
                longitude: data.longitude
            };

            delete data.city;
            delete data.street;
            delete data.zipcode;
            delete data.latitude;
            delete data.longitude;

            data.animalDetail = {
                animalId: data.animalID,
                animalType: data.animalType,
                name: data.name,
                breed: data.breed,
                color: data.color,
                gender: data.gender,
                size: data.size,
                description: data.description
            };

            delete data.animalID;
            delete data.animalType;
            delete data.name;
            delete data.breed;
            delete data.color;
            delete data.gender;
            delete data.size;
            delete data.description;

            data.imgURL = data.imgURL.split(',');
            data.date = new Date(data.date);
            data.date = data.date.toDateString();
            //data.date = data.date.toString.split('T');
        } else {
            throw new Error(`There is no case matched by id ${id}`);
        }

        response.send({
            success: true,
            data: data
        })
    } catch(error) {
        handleError(response, error.message);
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