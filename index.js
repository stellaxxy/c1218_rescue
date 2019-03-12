const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const googleMap = require('./services/maps');
const upload = require('./services/upload');
const nodemailer = require('nodemailer');
const {mailConfig} = require('./config');
var transporter = nodemailer.createTransport(mailConfig);


const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/client/dist'));


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


// API
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

        response.send({success: true, data});
    } catch (error) {
        handleError(response, error.message);
    }
});

app.get('/api/casedetails', async (request, response) => {
    try {
        let query = "SELECT c.`id`, c.`caseType`, c.`city`, c.`location`,c.`status`, c.`zipcode`, \n" +
            "            c.`latitude`, c.`longitude`, c.`coverImg`, c.`date`, a.`id` AS animalID, a.`animalType`, a.`name`, a.`breed`,\n" +
            "            a.`color`, a.`gender`, a.`size`, a.`description`, GROUP_CONCAT(i.`imgURL`) AS imgURL\n" +
            "            FROM `cases` AS c \n" +
            "            JOIN `animals` AS a ON a.`id` = c.`animalID` \n" +
            "            LEFT OUTER JOIN `images` AS i ON i.`animalID` = a.`id`\n";
        let data = {};

        if (request.query.caseKey || request.query.email) {
            if (request.query.caseKey === undefined) {
                throw new Error(`Please provide valid case key`);
            } else if (request.query.email === undefined) {
                throw new Error(`Please provide valid email`);
            }

            const caseKey = request.query.caseKey;
            const email = request.query.email;

            query = query + "INNER JOIN `users` u ON c.`userID` = u.`id`" + "WHERE u.`email` = ? AND c.`caseKey` = ?" + "GROUP BY c.`id`";

            data = await db.query(query, [email, caseKey]);

        } else {
            const id = request.query.id;
            if (id === undefined) {
                throw new Error(`Please provide a valid ID`);
            } else if (isNaN(id)) {
                throw new Error(`ID must be a number`);
            }

            query = query + "WHERE c.`id` = ?" + "GROUP BY c.`id`";

            data = await db.query(query, [id]);
        }


        const output = {
            success: false
        };


        if (data.length === 1) {
            data = data[0];

            data.location = {
                city: data.city,
                location: data.location,
                zipcode: data.zipcode,
                latitude: data.latitude,
                longitude: data.longitude
            };

            delete data.city;
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

//API for for lost dog
app.post('/api/createcase', upload.single('coverImg'), async (request, response) => {
    try {
        const {color, breed, name, animalType, gender, description, street, animalSize, city, email, petName, phone, caseType, caseDate, caseKey, imgURL} = request.body;
        const coverImg = upload.getFilepath(request);
        const caseDateFormatted = new Date(caseDate).toISOString().split('T')[0];

        const address = await googleMap.getAddress(`${street}, ${city}`);

// insert into users table
        const usersTable = "INSERT INTO `users` (`email`,`name`,`phone`) VALUES (?,?,?)";
        const insertUserInfo = [email, name, phone];
        const userquery = mysql.format(usersTable, insertUserInfo);
        const insertuser = await db.query(userquery);
        var userID = insertuser.insertId;

        //  insert into animal table
        const animalsTable = " INSERT INTO `animals` (`breed`,`color`,`name`,`animalType`,`gender`,`description`,`size`) VALUES (?,?,?,?,?,?,?)";
        const insert = [breed, color, petName, animalType, gender, description, animalSize];
        const query = mysql.format(animalsTable, insert);
        const insertResult = await db.query(query);
        var animalID = insertResult.insertId;

        //  insert into cases table
        const casesTable = "INSERT INTO `cases` (`city`,`location`,`caseType`,`latitude`,`longitude`, `state`, `zipcode`,`coverImg`,`date`,`animalID`,`userID`, `caseKey`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        const insertlocation = [address.city, street, caseType, address.latitude, address.longitude, address.state, address.zipcode, coverImg, caseDateFormatted, animalID, userID, caseKey];
        const casequery = mysql.format(casesTable, insertlocation);
        const insertcase = await db.query(casequery);
        console.log(insertcase)


        //  insert into image table
        if (imgURL) {
            const imageTable = "INSERT INTO `images` (`animalID`,`imgURL`) VALUES (?,?)"
            const imageInfo = [animalID, imgURL];
            const imagequery = mysql.format(imageTable, imageInfo);
            const insertimage = await db.query(imagequery);
        }

        response.send({
            success: true,
            insertID: insertcase.insertId,
            caseKey: caseKey,

        })
    } catch (error) {
        handleError(response, error);
    }

});
//close case:
app.post('/api/updatestatus', async (request, response) => {

    try {
        const {status, id} = request.body;
        if (id === undefined) {
            throw new Error(`Please provide a valid caseKey`);
        }
        const updatecases = "update cases set status = ? where id = ? "
        const updateStatus = [status, id];
        const updatequery = mysql.format(updatecases, updateStatus);
        const caseupdate = await db.query(updatequery);

        response.send({
            success: true,

        })
    } catch (error) {
        handleError(response, error);
    }

});


app.post('/api/contactuser', async (request, response) => {
    try {
        const {emailMessage, caseId} = request.body;

        // TODO: Get info from DB using caseId

        const userInfo = "select c.caseKey,c.city,c.caseType,a.animalType,u.email,c.id from cases as c join animals as a ON c.animalID=a.id JOIN users as u ON c.userID= u.id WHERE c.id = ?"
        const userCaseId = [caseId]
        const userEmail = mysql.format(userInfo, userCaseId);
        const userSendEmail = await db.query(userEmail);

        // const caseKey = 'ABCDEF';
        // const animalType = 'dog';
        // const userEmail = 'kk99807@gmail.com';
        // const city = 'Irvine';
        // const caseType = 'lost';

        /* seremail: [ RowDataPacket {
    caseKey: 'ABCDEF',
    city: 'Irvine',
    caseType: 'found',
    animalType: 'dog',
    email: 'test@test.com',
    id: 1 } ]*/
        const {caseType, caseKey, city, animalType, email, id} = userSendEmail[0]

        const subject = `Possible match for ${caseType} ${animalType} in ${city}`;
        // Four important options for our mailOptions
        const mailOptions = {
            from: mailConfig.auth.user,
            //to:'charubenjwal04@gmail.com',
            to: email,
            subject: subject,
            text: emailMessage
        };

        await transporter.sendMail(mailOptions);
        response.send({success: true});
    } catch (error) {
        handleError(response, error);
    }
});


app.post('/api/email', async (request, response) => {
    try {

        const {id} = request.body
        const emailInfo = "SELECT u.name,u.email,c.caseKey,c.id,c.caseType from users as u JOIN cases as c ON u.id= c.userID where u.id = ?"
        const userEmail = [id]
        const sendEmail = mysql.format(emailInfo, userEmail);
        const confirmationEmail = await db.query(sendEmail);
        console.log(confirmationEmail)
        const {caseType, caseKey, email, name} = confirmationEmail[0]

        const subject = `Your casekey is ${caseKey} ${caseType} `;
        const emailMessage = `Hello ${name} Thanks for using paws, please find your below details : ${caseKey} ${caseType}`

        const mailOptions = {
            from: mailConfig.auth.user,
            to: email,
            subject: subject,
            text: emailMessage
        };

        await transporter.sendMail(mailOptions);
        response.send({success: true});
    } catch (error) {
        handleError(response, error);
    }

})


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