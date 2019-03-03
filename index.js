
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const {googleMapApi} = require('./config/api');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const googleMap = require('@google/maps').createClient({
    key: googleMapApi,
    Promise: Promise
});

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

const CASELIST_FILTERS = [
    {
        param: 'caseType',
        validValues: ['lost', 'found'],
        sqlCriteria: 'c.`caseType` = ?'
    },
    {
        param: 'zipcode',
        sqlCriteria: 'c.`zipcode` = ?'
    },
    {
        param: 'city',
        sqlCriteria: 'c.`city` = ?'
    },
    {
        param: 'animalSize',
        validValues: ['small', 'medium', 'large'],
        sqlCriteria: 'a.`size` = ?'
    },
    {
        param: 'animalType',
        validValues: ['cat', 'dog'],
        sqlCriteria: 'a.`animalType` = ?'
    },
    {
        param: 'gender',
        validValues: ['female', 'male'],
        sqlCriteria: 'a.`gender` = ?'
    },
    {
        param: 'color',
        validValues: ['black',
            'blue',
            'brown',
            'chocolate',
            'cinnamon',
            'cream',
            'fawn',
            'gold',
            'gray',
            'lilac',
            'red',
            'smoke',
            'white',
            'yellow'],
        sqlCriteria: 'LOWER(a.`color`) = ?'
    }
];

// Middleware
app.use(cors());

app.use(express.json());

// API
app.get('/api/caselist', async (request, response) => {
    try {
        let sql = "SELECT \
                        c.`id`, \
                        a.`animalType`, \
                        c.`caseType`, \
                        c.`city`, \
                        c.`street`, \
                        c.`zipcode`, \
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
                if (filter.hasOwnProperty('validValues') && filter.validValues.indexOf(value) === -1) {
                    throw new Error(`Invalid value [${value}] for parameter [${filter.param}].  Valid values are: [${filter.validValues}]`);
                }
                filter_criteria.push(filter.sqlCriteria);
                filter_values.push(value);
            }
        });

        if (filter_criteria.length) {
            sql = sql + ' WHERE ' + filter_criteria.join(' AND ');
        }

        const data = await db.query(sql, filter_values);
        data.forEach(row => {
            row.location = {
                city: row.city,
                street: row.street,
                zipcode: row.zipcode,
                latitude: row.latitude,
                longitude: row.longitude
            };

            delete row.city;
            delete row.street;
            delete row.zipcode;
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

            if(data.imgURL !== null){
                data.imgURL = data.imgURL.split(',');
}
data.date = data.date.toLocaleDateString();

output.success = true;
output.data = data;
} else {
    throw new Error(`There is no case matched by id ${id}`);
}

response.send(output);
} catch(error) {
    handleError(response, error.message);
}

});


//API for for lost dog
app.post('/api/createcase', async (request, response) => {
    try {
        const {breed, color, name, animalType, gender, description, location, size, city, street, email, username, phone, caseType, zipcode, coverImg, date, imgURL} = request.body;

        const result = await googleMap.geocode({address: location}).asPromise();

        const longitude = result.json.results[0].geometry.location.lng;
        const latitude = result.json.results[0].geometry.location.lat;

// insert into users table
        const usersTable = "INSERT INTO `users` (`email`,`name`,`phone`) VALUES (?,?,?)";
        const insertUserInfo = [email, username, phone];
        const userquery = mysql.format(usersTable, insertUserInfo);
        const insertuser = await db.query(userquery);
        var userID = insertuser.insertId;

        //  insert into animal table
        const animalsTable = " INSERT INTO `animals` (`breed`,`color`,`name`,`animalType`,`gender`,`description`,`size`) VALUES (?,?,?,?,?,?,?)";
        const insert = [breed, color, name, animalType, gender, description, size,];
        const query = mysql.format(animalsTable, insert);
        const insertResult = await db.query(query);
        var animalID = insertResult.insertId;

        //  insert into cases table
        //`latitude`,`longitude`
        const casesTable = "INSERT INTO `cases` (`city`,`street`,`caseType`,`latitude`,`longitude`, `zipcode`,`coverImg`,`date`,`animalID`,`userID`) VALUES (?,?,?,?,?,?,?,?,?,?)";
        const insertlocation = [city, street, caseType, longitude, latitude, zipcode, coverImg, date, animalID, userID];
        const casequery = mysql.format(casesTable, insertlocation);
        const insertcase = await db.query(casequery);


        //  insert into image table
        const imageTable = "INSERT INTO `images` (`animalID`,`imgURL`) VALUES (?,?)"
        const imageInfo = [animalID, imgURL];
        const imagequery = mysql.format(imageTable, imageInfo);
        const insertimage = await db.query(imagequery);

        response.send({
            success: true,
            insertID: insertResult.insertID,

        })
    } catch (error) {
        handleError(response, 'Server Error');
    }

});

// Listen
app.listen(PORT, HOST, () => {
    console.log('Server running on ' + HOST + ':' + PORT);
}).on('error', (err) => {
    console.log('Server listen error.  You probably already have a server on port: ', PORT);
});

function handleError(response, errorMessage) {
    let success = false;
    response.send({success, errorMessage});
}