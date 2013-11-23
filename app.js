var express = require('express')
    , http = require('http')
    , path = require('path')
    , fs = require("fs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.render('', { title: 'Background Texture Browser' });
});

app.get('/services/textures', function(req, res) {
    var basePath = path.join(__dirname, 'static');
    var p = path.join(basePath + '/image');
    fs.readdir(p, function (err, files) {
        var paths = [];
        files.map(function(file) {
            paths.push({
                textureName: file,
                texturePath: path.join('/image', file),
                active: true,
                created: Date.now(),
                updated: Date.now()
            });
        });

        res.send(paths);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
