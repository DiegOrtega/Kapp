var cool = require('cool-ascii-faces');
var express = require('express');
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://mpjcvtjxocsmeb:gruLA0ckuOeqIRfkRyHDp9Vre9@ec2-54-204-27-193.compute-1.amazonaws.com:5432/d63j6ljg1re6ac";
//var client = new pg.Client(conString);
//client.connect();
var app = express();

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/db', function (request, response) {
  pg.connect(conString, function (err, client, done) {
    var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
  });
});

app.get('/', function (request, response) {
  response.render('pages/index')
});

app.get('/cool', function (request, response) {process.env.DATABASE_URL || 
  response.send(cool());
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});