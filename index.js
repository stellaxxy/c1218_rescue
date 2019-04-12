const express = require('express');
const cors = require('cors');
const axios = require('axios');
const {yelpApi} = require('./config/api');
const mysql = require('mysql');
const db = require('./db');
const googleMap = require('./services/maps');
const upload = require('./services/upload');
const nodemailer = require('nodemailer');
const {mailConfig} = require('./config');
const transporter = nodemailer.createTransport(mailConfig);
const Email = require('email-templates');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/client/dist'));
app.use(cors());

//===========================================================================================
// API
//===========================================================================================

//-------------------------------------------------------------------------------------------
// CASE LIST
//-------------------------------------------------------------------------------------------

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
        validValues: ['cat', 'dog', 'other'],
        sqlCriteria: 'a.`animalType` = ?'
    }
];

// ENDPOINT
app.get('/api/caselist', async (request, response) => {
    try {

        let sql = "SELECT c.`id`, c.`date`, a.`animalType`, a.`description`, c.`caseType`,\n" +
            "            c.`city`, c.`state`, c.`location`,c.`zipcode`,c.`latitude`, c.`longitude`,c.`coverImg`\n" +
            "            FROM `cases` c\n" +
            "            INNER JOIN `animals` a ON c.`animalID` = a.`id`";

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

        if(!data){
            throw new Error('sql error');
        }

        if(data.length > 0){
            data.forEach(row => {
                row.location = {
                    city: row.city,
                    location: row.location,
                    zipcode: row.zipcode,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    state: row.state
                };

                delete row.city;
                delete row.zipcode;
                delete row.latitude;
                delete row.longitude;
                delete row.state;
            });
        }

        response.send({success: true, data});

    } catch (error) {
        handleError(response, error.message);
    }
});

//-------------------------------------------------------------------------------------------
// CASE DETAILS
//-------------------------------------------------------------------------------------------
app.get('/api/casedetails', async (request, response) => {
    try {
        let query = "SELECT c.`id`, c.`caseType`, c.`city`, c.`location`,c.`status`, c.`state`, c.`zipcode`, \n" +
            "            c.`latitude`, c.`longitude`, c.`coverImg`, c.`date`, a.`id` AS animalID, a.`animalType`, a.`name`, a.`breed`,\n" +
            "            a.`color`, a.`gender`, a.`size`, a.`description`, u.`phone`, u.`name` AS userName, u.`email`, GROUP_CONCAT(i.`imgURL`) AS imgURL\n" +
            "            FROM `cases` AS c \n" +
            "            JOIN `animals` AS a ON a.`id` = c.`animalID` \n" +
            "            LEFT OUTER JOIN `images` AS i ON i.`animalID` = a.`id`\n" +
            "            INNER JOIN `users` u ON c.`userID` = u.`id` ";
        let data = {};

        // LOOKUP BY CASE KEY
        if (request.query.caseKey || request.query.email) {
            if (request.query.caseKey === undefined) {
                throw new Error(`Please provide valid case key`);
            } else if (request.query.email === undefined) {
                throw new Error(`Please provide valid email`);
            }

            const caseKey = request.query.caseKey;
            const email = request.query.email;

            query = query + "WHERE u.`email` = ? AND c.`caseKey` = ?" + "GROUP BY c.`id`";

            data = await db.query(query, [email, caseKey]);

        // LOOKUP BY CASE ID
        } else {
            const id = request.query.id;
            if (id === undefined) {
                throw new Error(`Please provide a valid ID`);
            } else if (isNaN(id)) {
                throw new Error(`ID must be a number`);
            }

            query = query + "WHERE c.`id` = ? GROUP BY c.`id`";

            data = await db.query(query, [id]);
        }

        // ASSEMBLE RESPONSE DATA
        const output = {
            success: false
        };


        if (data.length === 1) {
            data = data[0];

            data.location = {
                city: data.city,
                state: data.state,
                location: data.location,
                zipcode: data.zipcode,
                latitude: data.latitude,
                longitude: data.longitude
            };

            delete data.city;
            delete data.state;
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

            if (data.imgURL !== null) {
                data.imgURL = data.imgURL.split(',');
            }

            data.date = data.date.toLocaleDateString();

            output.success = true;
            output.data = data;

        } else {
            throw new Error(`There is no matching case.`);
        }
        response.send(output);
    } catch (error) {
        handleError(response, error.message);
    }

});

//-------------------------------------------------------------------------------------------
// CREATE A CASE
//-------------------------------------------------------------------------------------------
app.post('/api/createcase', upload.single('coverImg'), async (request, response) => {
    try {
        const {color, breed, name, animalType, gender, description, street, animalSize, city, email, petName, phone, caseType, caseDate, imgURL, caseKey} = request.body;
        const coverImg = upload.getFilepath(request);
        const caseDateFormatted = new Date(caseDate).toISOString().split('T')[0];

        const address = await googleMap.getAddress(`${street}, ${city}`);
        if(!address){
            throw new Error('google map geocode error');
        }

        // insert into users table
        const usersTable = "INSERT INTO `users` (`email`,`name`,`phone`) VALUES (?,?,?)";
        const insertUserInfo = [email, name, phone];
        const userquery = mysql.format(usersTable, insertUserInfo);
        const insertuser = await db.query(userquery);

        if(!insertuser){
            throw new Error('sql error');
        }
        var userID = insertuser.insertId;

        //  insert into animal table
        const animalsTable = " INSERT INTO `animals` (`breed`,`color`,`name`,`animalType`,`gender`,`description`,`size`) VALUES (?,?,?,?,?,?,?)";
        const insert = [breed, color, petName, animalType, gender, description, animalSize];
        const query = mysql.format(animalsTable, insert);
        const insertResult = await db.query(query);

        if(!insertResult){
            throw new Error('sql error');
        }
        var animalID = insertResult.insertId;

        //  insert into cases table
        const casesTable = "INSERT INTO `cases` (`city`,`location`,`caseType`,`latitude`,`longitude`, `state`, `zipcode`,`coverImg`,`date`,`animalID`,`userID`, `caseKey`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        const insertlocation = [address.city, street, caseType, address.latitude, address.longitude, address.state, address.zipcode, coverImg, caseDateFormatted, animalID, userID, caseKey];
        const casequery = mysql.format(casesTable, insertlocation);
        const insertcase = await db.query(casequery);

        if(!insertcase){
            throw new Error('sql error');
        }
        // send mail after registering case

        const emailTemplate = new Email({
            message: {
                from: mailConfig.auth.user
            },
            // uncomment below to send emails in development/test env:
            send: true,
            preview: false,
            transport: transporter
        });

        emailTemplate
            .send({
                template: 'paws',
                message: {
                    to: email
                },
                locals: {
                    name: name,
                    caseKey:caseKey,
                    caseType:caseType,
                    city:city
                }
            })
            .then(console.log)
            .catch(console.error);


        //  insert into image table
        if (imgURL) {
            const imageTable = "INSERT INTO `images` (`animalID`,`imgURL`) VALUES (?,?)"
            const imageInfo = [animalID, imgURL];
            const imagequery = mysql.format(imageTable, imageInfo);
            const insertimage = await db.query(imagequery);

            if(!insertimage){
                throw new Error('sql error');
            }
        }

        response.send({
            success: true,
            insertID: insertcase.insertId,
            caseKey: caseKey,

        })
    } catch (error) {
        handleError(response, error.message);
    }

});

//-------------------------------------------------------------------------------------------
// CLOSE A CASE
//-------------------------------------------------------------------------------------------
app.post('/api/updatestatus', async (request, response) => {

    try {
        const {status, id} = request.body;
        if(!id){
            throw new Error(`Please provide a valid id`);
        } else if(isNaN(id)){
            throw new Error(`Id must be a number`);
        }
        const updatecases = "update cases set status = ? where id = ? "
        const updateStatus = [status, id];
        const updatequery = mysql.format(updatecases, updateStatus);
        const caseupdate = await db.query(updatequery);

        if(!caseupdate){
            throw new Error('sql error');
        }

        response.send({
            success: true,

        })
    } catch (error) {
        handleError(response, error.message);
    }

});

//-------------------------------------------------------------------------------------------
// UPDATE A CASE
//-------------------------------------------------------------------------------------------
app.post('/api/updatecase', upload.single('coverImg'), async (request, response) => {

    try {

        // VALIDATE CASE ID
        const {id} = request.body;

        if(!id){
            throw new Error(`Please provide a valid id`);
        } else if(isNaN(id)){
            throw new Error(`Id must be a number`);
        }

        // DERIVE UPDATE VALUES
        const result = request.body;

        const address = await googleMap.getAddress(`${result.street}, ${result.city}`);
        if(!address){
            throw new Error('google map geocode error');
        }

        const caseDateFormatted = new Date(result.caseDate).toISOString().split('T')[0];

        const updateValues = [result.caseType, result.city, result.street, address.state, address.zipcode, address.latitude, address.longitude, caseDateFormatted, result.name, result.email, result.phone, result.animalSize, result.animalType, result.description];

        // BASE SQL
        let baseSQL = "UPDATE `cases` AS c INNER JOIN `users` AS u ON c.`userID` = u.`id` INNER JOIN `animals` AS a ON a.`id` = c.`animalID` \n" +
            "SET c.`caseType` = ?, c.`city` = ?, c.`location` = ?, c.`state` = ?, c.`zipcode` = ?, c.`latitude` = ?, c.`longitude` = ?, \n" +
            "c.`date` = ?, u.`name` = ?, u.`email` = ?, u.`phone` = ?, a.`size` = ?, a.`animalType` = ?, a.`description` = ? \n";

        // CHANGE PHOTO IF PROVIDED
        const coverImg = upload.getFilepath(request);
        if (coverImg) {
            updateValues.push(coverImg);
            baseSQL += ", c.`coverImg` = ?";
        }

        // ADD WHERE CLAUSE TO SQL
        const updateQuery = baseSQL + " WHERE c.`id` = ?";
        updateValues.push(id);

        // FORMAT SQL WITH VALUES & EXECUTE
        const updateFormattedQuery = mysql.format(updateQuery, updateValues);
        const updateResult = await db.query(updateFormattedQuery);

        if(!updateResult){
            throw new Error('sql error');
        }

        response.send({
            success: true
        });

    } catch (error) {
        handleError(response, error.message);
    }

});

//-------------------------------------------------------------------------------------------
// CONTACT USER WHO REPORTED A CASE
//-------------------------------------------------------------------------------------------
app.post('/api/contactuser', async (request, response) => {
    try {
        const {emailMessage, caseId} = request.body;

        if(!caseId){
            throw new Error(`Please provide a valid id`);
        } else if(isNaN(caseId)){
            throw new Error(`Id must be a number`);
        }
        // TODO: Get info from DB using caseId

        const userInfo = "select c.caseKey,c.city,c.caseType,a.animalType,u.email,u.phone,c.id from cases as c join animals as a ON c.animalID=a.id JOIN users as u ON c.userID= u.id WHERE c.id = ?"
        const userCaseId = [caseId]
        const userEmail = mysql.format(userInfo, userCaseId);
        const userSendEmail = await db.query(userEmail);

        if(!userSendEmail){
            throw new Error('sql error');
        }

        const {caseType, caseKey, city, animalType, email, id, phone} = userSendEmail[0];

        const subject = `Possible match for ${caseType} ${animalType} in ${city}`;
        const mailOptions = {
            from: mailConfig.auth.user,
            to: email,
            subject: subject,
            text: emailMessage
        };

        await transporter.sendMail(mailOptions);
        response.send({success: true});
    } catch (error) {
        handleError(response, error.message);
    }
});

//-------------------------------------------------------------------------------------------
// USER DETAILS
//-------------------------------------------------------------------------------------------
app.get('/api/userdetails', async (request, response) => {

    try {
        const {caseid} = request.query;
        const phonenoquery = "select u.* from cases as c join users as u ON c.userID =u.id WHERE c.id=?";
        const usercall = mysql.format(phonenoquery, [caseid]);
        const calluser = await db.query(usercall);

        if(!calluser){
            throw new Error('sql error');
        }

        response.send({
            success: true,
            data:calluser[0]

        })
    } catch (error) {
        handleError(response, error.message);
    }

});

//-------------------------------------------------------------------------------------------
// YELP VET LIST
//-------------------------------------------------------------------------------------------
app.post('/api/yelp/businesses', async (request, response) => {

    try {
        const {location} = request.body;
        let yelpURL = 'https://api.yelp.com/v3/businesses/search';

        let config = {
            params: {
                term: 'vet'
            },
            headers: {
                'Authorization': "Bearer " + yelpApi
            }
        };

        if (location) {
            config.params.location = location;
        } else {
            throw new Error('Please enter in valid location');
        }

        const data = await axios.get(yelpURL, config);

        if(!data){
            throw new Error('yelp api error');
        }

        response.send({
            result: data.data
        });

    } catch (error) {
        handleError(response, error.message);
    }
});

//-------------------------------------------------------------------------------------------
// YELP VET DETAILS
//-------------------------------------------------------------------------------------------
app.get('/api/yelp/details', async (request, response) => {

    try {
        const {id} = request.query;
        if (!id) {
            throw new Error('Please provide valid id.');
        }

        let config = {
            headers: {
                'Authorization': "Bearer " + yelpApi
            }
        };

        const result = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, config);

        if(!result){
            throw new Error('yelp api error');
        }

        response.send({
            data: result.data
        })
    } catch (error) {
        handleError(response, error.message);
    }
});

//-------------------------------------------------------------------------------------------
// PET FOUND DATA
//-------------------------------------------------------------------------------------------
app.get('/api/petfound', async (request, response) => {

    try {
       const query = "SELECT COUNT(c.`status`) AS successCount FROM `cases` AS c WHERE c.`status` = 'closed'";

       const data = await db.query(query);

       if(!data){
           throw new Error('sql error');
       }

       response.send({
           successCount: data[0].successCount
        })

    } catch (error) {
        handleError(response, error.message);
    }
});

//-------------------------------------------------------------------------------------------
// PET FOUND DATA
//-------------------------------------------------------------------------------------------
app.get('/api/memebertotal', async (request, response) => {

    try {
        const query = "SELECT COUNT(c.`userID`) AS memberCount FROM `cases` AS c";

        const data = await db.query(query);

        if(!data){
            throw new Error('sql error');
        }

        response.send({
            memberCount: data[0].memberCount
        })

    } catch (error) {
        handleError(response, error.message);
    }
});

app.get('*', (request, response) => {
    response.sendFile(__dirname + '/client/dist/index.html');

});


// Listen
app.listen(PORT, HOST, () => {
    console.log('Server running on ' + HOST + ':' + PORT);
}).on('error', (err) => {
    console.log('Server listen error.  You probably already have a server on port: ', PORT);
});

function handleError(response, error) {
    let result = {success: false};

    if (typeof error === 'string') {
        result.errorMessage = error;
        result.trace = '';
    } else {
        result.errorMessage = error.message;
        result.trace = error.stack;
    }

    response.send(result);
}