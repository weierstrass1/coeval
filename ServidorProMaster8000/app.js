var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var conection = require('./connection');
var routes = require('./routes');
var cors = require('./cors');

app.use(cors.permissions);
conection.init();
routes.configure(app);

var server = app.listen(8000, function(){
    console.log("Listening at port: ", server.address().port);
});
