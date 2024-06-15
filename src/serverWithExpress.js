const express = require('express' ) //commonjs
const path = require('path')
require('dotenv').config();
// import express from 'express'; // es modules
const app = express()   //app express
const port = process.env.PORT || 8888   //port
const configViewEngine = require('./config/viewEngine')
const webRoute = require('./routes/web')
const connection = require('./config/database')
//get client
var mysql      = require('mysql2');

//config template engine and static file
configViewEngine(app)

//config req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//khai bao route
app.use('/', webRoute)



// connection.query(
//     'SELECT * FROM `Users` WHERE `name` = "John Doe" ',
//     function(err, results, fields){
//         console.log("____result____", results);
//     }
// )

app.listen(port,() =>{
    console.log(`Port is ${port}`)
})