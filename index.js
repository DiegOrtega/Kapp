var express = require('express');
var app = express();
var pg = require('pg');

var conString = "postgres://postgres:LaignoranciaeslaFuerza@localhost/postgres";
 
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST) 
    client.end();
  });
});

app.get('/db', function (request, response) {
  pg.connect(conString, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/index', function(request, response) {
  response.render('pages/index');
});

app.get('/registro', function(request, response) {
  response.render('pages/registro');
});

app.get('/', function(request, response) {
  response.render('pages/about-us');
});

app.get('/about-us', function(request, response) {
  response.render('pages/about-us');
});

app.get('/activity', function(request, response) {
  response.render('pages/activity');
});

app.get('/ajax_for_index', function(request, response) {
  response.render('pages/ajax_for_index');
});

app.get('/author-edit', function(request, response) {
  response.render('pages/author-edit');
});

app.get('/author-login', function(request, response) {
  response.render('pages/author-login');
});

app.get('/author', function(request, response) {
  response.render('pages/author');
});

app.get('/blog-2', function(request, response) {
  response.render('pages/blog-2');
});

app.get('/blog-3', function(request, response) {
  response.render('pages/blog-3');
});

app.get('/blog-detail', function(request, response) {
  response.render('pages/blog-detail');
});

app.get('/blog-detail-2', function(request, response) {
  response.render('pages/blog-detail-2');
});

app.get('/perfil_karen', function(request, response) {
  response.render('pages/perfil_karen');
});

app.get('/pro_lp', function(request, response) {
  response.render('pages/perfil_Diego');
});

app.get('/perfil_Eduardo', function(request, response) {
  response.render('pages/perfil_Eduardo');
});

app.get('/pro_lca', function(request, response) {
  response.render('pages/perfil_oscar');
});

app.get('/blog', function(request, response) {
  response.render('pages/blog');
});

app.get('/conctact-us', function(request, response) {
  response.render('pages/contact-us');
});

app.get('/faq', function(request, response) {
  response.render('pages/faq');
});

app.get('/gallery', function(request, response) {
  response.render('pages/gallery');
});

app.get('/login', function(request, response) {
  response.render('pages/login');
});

app.get('/messages-2', function(request, response) {
  response.render('pages/messages-2');
});

app.get('/messages', function(request, response) {
  response.render('pages/messages');
});

app.get('/organization', function(request, response) {
  response.render('pages/organization');
});

app.get('/page1', function(request, response) {
  response.render('pages/page1');
});

app.get('/Is', function(request, response) {
  response.render('pages/Is_perfil');
});

app.get('/page3', function(request, response) {
  response.render('pages/page3');
});

app.get('/people', function(request, response) {
  response.render('pages/people');
});

app.get('/search', function(request, response) {
  response.render('pages/search');
});

app.get('/shortcodes', function(request, response) {
  response.render('pages/shortcodes');
});

app.get('/site-map', function(request, response) {
  response.render('pages/site-map');
});

app.get('/statictics', function(request, response) {
  response.render('pages/statictics');
});

app.get('/work', function(request, response) {
  response.render('pages/work');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


