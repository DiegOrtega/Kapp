
var express = require('express');
var app = express();
var pg = require('pg');
var 
var DATABASE_URL = "postgres://mpjcvtjxocsmeb:gruLA0ckuOeqIRfkRyHDp9Vre9@ec2-54-204-27-193.compute-1.amazonaws.com:5432/d63j6ljg1re6ac";


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/db', function (request, response) {
  pg.connect(procces.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
        
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});