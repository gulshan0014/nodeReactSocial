require('dotenv').config()
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

var routes = require("./app/routes");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.use('/api/v1', routes(express.Router()));

http.listen(3000, function(){
  console.log('listening on *:3000');
});