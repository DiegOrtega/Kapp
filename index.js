var express = require('express');
var app = express();

app.set('port', (5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/view/pages');
app.set('partials', 'ejs');

app.get('/', function(request, response) {
  response.render('Users/DiegOrtega/node-js-getting-started/views/pages/index.ejs');
});

app.listen(app.get('port'), function() {
  console.log('Listening on ', app.get('port'));
});



