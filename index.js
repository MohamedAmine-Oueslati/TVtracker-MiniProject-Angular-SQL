const express = require('express');
const app = express();
// const fetch = require("node-fetch");
const db = require('./Database-SQL')

const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
// const path = require('path');

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// authentication
var Users = require("./routes/Users")
app.use("/users", Users)

//update profile
var Update = require("./routes/Update")
app.use("/", Update)

//Explore Shows
var Explore = require("./routes/Explore")
app.use("/", Explore)

//Watch List Shows
var WatchList = require("./routes/WatchList")
app.use("/", WatchList)

//Show Details
var ShowDetails = require("./routes/ShowDetails")
app.use("/", ShowDetails)

//Filter Show
var FilterShow = require("./routes/FilterShow")
app.use("/", FilterShow)

//Filter Feed
var FilterFeed = require("./routes/FilterFeed")
app.use("/", FilterFeed)

//Feed Table
var Feed = require("./models/Feed")
app.use("/", Feed)

//User Table
var User = require("./models/User")
app.use("/", User)

//Show Table
var Show = require("./models/Show")
app.use("/", Show)

//Database
// var Database = require("./Database-SQL")
// app.use("/", Database)



app.listen(PORT, () => {
  console.log('App is listetning on PORT', PORT);
});