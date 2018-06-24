var express = require('express');
var bodyParser = require('body-parser');

var usuario = require('./routes/usuario.js');
var login = require('./routes/login');
var campana = require('./routes/campana.js');
var datosJugador = require('./routes/datosJugador.js');
var resultado = require('./routes/resultado');


var app = express();
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://pedro:stavros1234@ds161520.mlab.com:61520/questionapp', {promiseLibrary: require('bluebird')})     
    .then(()=>{
        console.log('Conectado a Base de Datos');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}));

app.use('/usuario', usuario);
app.use('/login', login);
app.use('/campana', campana);
app.use('/datos', datosJugador);

app.listen(3000, function(){
    console.log('Servidor escuchando en puerto 3000');
});
