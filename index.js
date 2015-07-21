var cool = require('cool-ascii-faces');
var express = require('express')
  //, routes = require('node-js-getting-started')
  , http = require('http')
  , path = require('path');
var pg = require('pg');
var query = require("pg-query");
var conString = process.env.DATABASE_URL || "postgres://mpjcvtjxocsmeb:gruLA0ckuOeqIRfkRyHDp9Vre9@ec2-54-204-27-193.compute-1.amazonaws.com:5432/d63j6ljg1re6ac";
//var Sequelize = require('sequelize');
//var sequelize = new Sequelize('postgres://mpjcvtjxocsmeb:gruLA0ckuOeqIRfkRyHDp9Vre9@ec2-54-204-27-193.compute-1.amazonaws.com:5432/d63j6ljg1re6ac');
var app = express();
var client = new pg.Client(conString);
//client.connect();


//blog.koalite.com
//app.configure( function(){
app.set('port', process.env.PORT || 5023);
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(__dirname + '/public'));
//});
 
//app.configure('development', function(){
//  app.use(express.errorHandler());
//});
 

app.get('/', function (request, response) {
  response.render('pages/index')
});

app.get('/db', function (request, response) {
  pg.connect(conString, function (err, client, done) {
    query('SELECT * FROM test_table', function (err, result) {
      if (err)
       { console.error(err); response.send("Error #marafaka " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); };
    done();  
    });
  });
});

app.get('/cool', function (request, response) {process.env.DATABASE_URL || 
  response.send(cool());
});


http.createServer(app).listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

