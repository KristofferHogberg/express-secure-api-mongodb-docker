// Setup the server 
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./db');
const PORT = 3005;

// Connect to DB with mongoose
mongoose
    .connect(config.DB, function(err, db) {
        if(err) {
            console.log('database is not connected')
        }
        else {
            console.log('connected!!')
        }
    }
    );

// 
app.get('/', function(req, res) {
    res.json( {"title": "Ninjas from Space II"} );
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});