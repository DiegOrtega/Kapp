var express = require('express');
var neo4j = require('neo4j-driver').v1;
var router = express.Router();
var app = express();

var resultado ="";
var checkMail= "none";
var resultado_registro ="";

//Conexión con base de datos remota
var graphenedbURL = process.env.GRAPHENEDB_MAROON_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_MAROON_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_MAROON_BOLT_PASSWORD;

//Protocolo de conexión para servidor cloud heroku
var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

//Protocolo de conexión para servidor local
//var driver = neo4j.driver('bolt://localhost' , neo4j.auth.basic('neo4j','tractus0'));

//Se declara la variable session para hacer consultas en la base de datos
var session = driver.session(); 

router.post('/user/add',function(request, response){
   var nombre = request.body.user_name;   
   var apellido = request.body.user_lastName;
   var pais = request.body.user_country;
   var email = request.body.user_email;
   var genero = request.body.user_genre; 
   var contraseña = request.body.user_pass; 
   var edad = request.body.user_age;    
   var noticias = request.body.user_noticias;  
    
    if(noticias != "Si"){
        noticias = "No"
    };
   //var checkboxes= $("input[name='chk[]']:checked").length > 1;    
   /*var dia_nacimiento = request.body.user_birthday;
   var mes_nacimiento = request.body.user_birthmonth;
   var año_nacimiento = requsest.body.user_birthyear;
   var nacimiento = [dia_nacimiento,mes_nacimiento,año_nacimiento];*/
    session
        .run('MATCH (n:usuario {email:{emailParam}}) RETURN n.email AS email', {emailParam:email})
    
        .then(function(result){ 
            console.log(result.records[0]); 
            //var emailCheck = result.records[0].get("email");
        
            if(result.records[0] != undefined){
                console.log("correo repetido")
                resultado ="Correo repetido";
                checkMail= "block";    
                response.redirect("/");
                session.close;    
                
            }else{ 
                session
                    .run('CREATE (n:usuario {nombre:{nombreParam}, apellido:{apellidoParam}, pais:{paisParam}, email:{emailParam}, genero:{generoParam}, contraseña:{contraseñaParam}, edad:{edadParam}, noticias:{noticiasParam} })', {nombreParam:nombre, apellidoParam:apellido, paisParam:pais, emailParam:email, generoParam:genero, contraseñaParam:contraseña, edadParam:edad, noticiasParam:noticias})

                    .then(function(result){
                        console.log("correo adecuado");
                        resultado_registro ="script/bienvenida.js";
                        checkMail= "none";
                        response.redirect('/');
                        session.close;
                    })

                    .catch(function(err){
                        console.log("error = " + err);
                    });
            }
        })
        .catch(function(err){
            console.log(err);
        });           
});

router.get('/', function(request, response) {      
  response.render('pages/about-us',{
      resultado: resultado,
      desplegar: checkMail,
      resultado_registro: resultado_registro
  });
});

module.exports = router;