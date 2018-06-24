var express = require('express');
var mongoose = require('mongoose');
var DatosJugador = require('../models/datosJugador.js')
var app = express();
var autenToken = require('../middleware/autentoken.js');

app.get('/', autenToken.verificarToken, (req, res, next)=>{ 
    DatosJugador.find({}).exec((err, datosJugadores)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            datosJugadores: datosJugadores
        });
    });
});

app.get('/cliente/:cliente/:campana', autenToken.verificarToken, (req, res, next)=>{ 
    var cliente = req.params.cliente;
    var campana = req.params.campana;
    DatosJugador.find({cliente:cliente,campana:campana}).exec((err, datosJugadores)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            datosJugadores: datosJugadores
        });
    });
});

app.get('/:id', autenToken.verificarToken, function(req, res, next){
    DatosJugador.findById(req.params.id, (err, datosJugador)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            datosJugador: datosJugador
        });
    });
});

app.post('/', autenToken.verificarToken, (req, res)=>{
    var body = req.body;
    var datosJugador = new DatosJugador({
        jugador: body.jugador,
        cliente: body.cliente,        
        campana: body.campana,
        datos: body.datos
    });
    datosJugador.save((err, datosGuardados)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear nuevos datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            datosJugador: datosGuardados
        });
    }); 
});

app.put('/:id', autenToken.verificarToken, function(req, res, next){

    DatosJugador.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err); 
        res.json({ 
            ok: 'true',
            mensaje: 'Datos actualizados'
        });
    });
});

app.delete('/:id', autenToken.verificarToken, function(req, res, error){
    DatosJugador.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Datos de Campaña ' + datos.campana + ' eliminados';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });

});

module.exports = app;
