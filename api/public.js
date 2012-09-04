
var https = require('https');
var http = require('http');
var restify = require('restify');
var campfireModule = require('node-campfire');

var campfire = campfireModule.createCampfireAPI(
    {
        campfireName: 'nodoto',
        apiToken: 'a9619c12e3e2c5e83d2deeea8f1bf3296ca578dc',
    }
)

var errorHandler = function buildErrorHandler(response) {
    return function(body, err, errorResponse) {
        console.log('Campfire Error: %d: %j', errorResponse.statusCode, err);
        response.status(errorResponse.statusCode).send(body);
    };
}
var app = require.main.exports.app;

app.get('/api/myrooms', function (req, response){
    campfire.rooms(
        function(result) {
            response.send(result);
        },
        errorHandler(response)
    );
});


app.get('/api/r/:id/lock', function (req, response){
    campfire.room.lock(req.params.id, true,
        function(result) {
            response.send(result);
        },
        errorHandler(response)
    );
});
app.get('/api/r/:id/unlock', function (req, response){
    campfire.room.lock(req.params.id, false,
        function(result) {
            response.send(result);
        },
        errorHandler(response)
    );
});

app.get('/api/r/:id', function (req, response){
    campfire.room(req.params.id,
        function(result) {
            response.send(result);
        },
        errorHandler(response)
    );
});

app.get('/api/r/:id/:topic', function (req, response){
    campfire.room.update(req.params.id, req.params.topic, null,
        function(result) {
            response.send(result);
        },
        errorHandler(response)
    );
});

