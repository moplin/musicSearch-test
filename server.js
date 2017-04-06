var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
//var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/dist'));

// set the home page route
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

var server = app.listen(process.env.PORT || 80);

app.listen(server, function() {
    console.log('Ok done');
});