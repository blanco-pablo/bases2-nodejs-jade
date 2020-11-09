const express = require('express');
const app = express();
const morgan = require('morgan');
const route = require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

app.set("view engine","jade");

app.use(route);

module.exports = app;