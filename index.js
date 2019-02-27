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

// Middleware
app.use(cors());

app.use(express.json());

// API
app.get('/api/maplist', (req, res) => {
    res.send('Hello MapList');
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