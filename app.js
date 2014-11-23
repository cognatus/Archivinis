
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('photos', __dirname + '/public/photos');//importante para guardar
app.set('views', path.join(__dirname, 'views'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/photos" }));//importante para guardar
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var upload = function(req, res){

  	var file = req.files.image;
    var  name = "vaca vestida de uniforme";
    var  type = file.type;
    var  lugar = (__dirname + "/public/photos/" + name + ".jpg");
    
  fs.rename(file.path, lugar, function(err){
    if(err) res.send("Ocurrio un error al intentar subir la imagen");
    res.end("Ver imagen");
  });

    
};

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/upload', upload);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
