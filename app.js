
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , marked = require('marked')
  ;

var app = express();
exports.app = app;

app.set('isProduction', process.env['NODE_ENV'] === 'production');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger(app.get('isProduction') ? '' : 'dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    console.log('Configured for Development');
    app.set('trust proxy', true);
    app.use(express.errorHandler());
});
app.configure('production', function(){
    console.log('Configured for Production');
});

require('./api/public');

app.get('/', routes.index);
app.get('/Details', routes.details);

// Set options for the markdown processor
marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false
});

//for (key in process.env) {
//    console.log("process[" + key + "] = " + process.env[key]);
//}

//for (var i = 0; i < 10; i++) {
//    try {
//        var data = "";
//        obj = JSON.parse(data);
//        console.log(obj.toString());
//    } catch (e) {
//        console.log('parse');
//    }
//}

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

//function() {
//    console.log((new Date()).toString('yyyy-MM-dd hh:mm:ss'));
//    setTimeout(timer, 60 * 1000);
//}();