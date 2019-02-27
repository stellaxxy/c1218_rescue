const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
var bodyParser = require('body-parser');


const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CASELIST_FILTERS = [
    {
        param: 'case_type',
        validValues: ['lost','found'],
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
        param: 'size',
        validValues: ['small','medium','large'],
        sqlCriteria: 'a.`size` = ?'
    },
    {
        param: 'animal_type',
        validValues: ['cat','dog'],
        sqlCriteria: 'a.`animalType` = ?'
    },
    {
        param: 'gender',
        validValues: ['female','male'],
        sqlCriteria: 'a.`gender` = ?'
    },
    {
        param: 'color',
        validValues: [  'black',
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

        const data = await db.query( sql, filter_values );
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

//API for for lost dog
app.post('/api/createcase' , async(request,response)=>{

    console.log(request.body);

    try {



            const {breed, color, name, animalType, gender, description, size, city, street, email, username, phone, caseType, zipcode, latitude, longitude, coverImg, date, animalID} = request.body;

// insert into animal table
            const animalsTable = " INSERT INTO `animals`(`breed`,`color`,`name`,`animalType`,`gender`,`description`,`size`,`animalID`) VALUES (?,?,?,?,?,?,?,?)";

            const insert = [breed, color, name, animalType, gender, description, size,animalID]

            const query = mysql.format(animalsTable, insert);

            const insertResult = await db.query(query);
            console.log('insert query for animal table', insertResult);


// insert into cases table

        const casesTable = "INSERT INTO `cases` (`city`,`street`,`caseType`,`zipcode`,`latitude`,`longitude`,`coverImg`,`date`) VALUES (?,?,?,?,?,?,?,?)";

        const insertlocation = [city,street,caseType,zipcode,latitude,longitude,coverImg,date];

        const casequery = mysql.format (casesTable , insertlocation);

        const insertcase = await db.query (casequery );

// insert into users table

        const usersTable = "INSERT INTO `users` (`email`,`username`,`phone`) VALUES (?,?,?)";

        const insertUserInfo = [email,username,phone];

        const userquery = mysql.format(usersTable , insertUserInfo);

        const insertuser = await db.query(userquery);


        response.send({
            success: true,
            insertID: insertResult.insertID,

        })
    } catch(error){

        console.log(error);

        handleError(response, 'Server Error');
    }

})

function handleError(response,error){
    response.status(500).send({success:false,error:[error]})

}


//location table =city , street

// user table = email,phone




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