var express = require('express');
var config = require('config');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.listen(config.port, function() {
    var environment = process.env.NODE_ENV || 'localhost';
    var port = config.port;

    console.log('Express static server running on ' + environment + ' ' + port);
});
