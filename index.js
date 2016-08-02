var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

var graphenedbURL = process.env.GRAPHENEDB_MAROON_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_MAROON_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_MAROON_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
//var driver = neo4j.driver(graphenedbURL || 'bolt://localhost' , neo4j.auth.basic(graphenedbUser, graphenedbPass) || neo4j.auth.basic('neo4j','tractus0'));

var session = driver.session(); 
/*
app.get('/db', function(request, response) {
    session
        .run('MATCH(n:Movie) WHERE n.title=~"B.*" RETURN DISTINCT n LIMIT 25')
        .then(function(result){
            var movieArray = [];
            result.records.forEach(function(record){
                movieArray.push({
                    id: record._fields[0].identity.low,
                    title: record._fields[0].properties.title,
                    year: record._fields[0].properties.year
                });   
            });
        
            session
                .run('MATCH (n:Person)-[:ACTED_IN]->() RETURN DISTINCT n LIMIT 25')
                .then(function(result2){
                    var actorArray = [];
                    result2.records.forEach(function(record){
                        actorArray.push({
                            id: record._fields[0].identity.low,
                            name: record._fields[0].properties.name
                        });    
                    });
                    response.render('pages/db', {
                        movies: movieArray,
                        actors: actorArray
                    });
                })
                .catch(function(err){
                    console.log(err); 
            });    
        })
        .catch(function(err){
            console.log(err);
    });
});

app.post('/movie/add',function(request, response){
   var movie_title = request.body.movie_title;   
   var movie_year = request.body.movie_year;
   
    session
        .run('CREATE (n:Movie {title:{titleParam}, year:{yearParam}})', {titleParam:movie_title, yearParam:movie_year})
        .then(function(result){
        response.redirect('/db');
    
        session.close;
    })
        .catch(function(err){
        console.log(err);
    });
});

app.post('/actor/add',function(request, response){
   var name = request.body.name;   
   
    session
        .run('CREATE (n:Person {name:{nameParam}})', {nameParam:name})
        .then(function(result){
        response.redirect('/db');
    
        session.close;
    })
        .catch(function(err){
        console.log(err);
    });
});

app.post('/movie/actor/add',function(request, response){
   var name = request.body.name;
   var movie_title = request.body.movie_title;    
   
    session
        .run('MERGE (n:Person {name:{nameParam}})-[:ACTED_IN]->(m:Movie {title:{titleParam}})', {nameParam:name, titleParam: movie_title})
        .then(function(result){
        response.redirect('/db');
    
        session.close;
    })
        .catch(function(err){
        console.log(err);
    });
});
*/

session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
 
app.get('/index', function(request, response) {
  response.render('pages/index');
});

app.get('/registro', function(request, response) {
  response.render('pages/registro');
});

app.get('/', function(request, response) {
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

app.get('/pro_llrp', function(request, response) {
  response.render('pages/perfil_Beto');
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


