var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;
var validator = require('validator'); 
var reload = require('reload');

var app = express();

// views es el directorio donde se alojan los HTML
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Bodyparser

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//En public se encuentran los CSS y JS, imagenes...
app.use(express.static(__dirname + '/public'));

//se setea el puerto donde se correra el sitio web, process localiza el puerto donde debe correr cuando se sube la página al servidor cloud de heroku
app.set('port', (process.env.PORT || 5000));

//Conexión con base de datos remota
var graphenedbURL = process.env.GRAPHENEDB_MAROON_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_MAROON_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_MAROON_BOLT_PASSWORD;


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
*/

//Se llama index.js donde se ubican todos los procesos relacionados al despliegue de esta página

app.use(require('./rutas/index'));

//Todas las demas rutas aún no han sido modularizadas
app.get('/home', function(request, response) {    
  response.render('pages/home');
});

app.get('/registro', function(request, response) {
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

app.get('/pro_lcl', function(request, response) {
  response.render('pages/perfil_Francisco');
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

app.get('/mapa', function(request, response) {
  response.render('pages/mapa');
});

app.get("/registro-exitoso", function(request, response){
    response.render("pages/registro-exitoso");
});


//Se activa el servidor
var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//Este código es para utilizar paquete reload, aún no funciona
//reload(server, app);


