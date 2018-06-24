var express = require('express');
var mongoose = require('mongoose');
var Campana = require('../models/campana.js')
var app = express();
var autenToken = require('../middleware/autentoken.js');

app.get('/', autenToken.verificarToken, (req, res, next)=>{ 
    Campana.find({}).sort({cliente:-1}).exec((err, campanas)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            campanas: campanas
        });
    });
});

app.get('/cliente/:nombre', autenToken.verificarToken, (req, res, next)=>{ 
    var nombre = req.params.nombre;
    Campana.find({cliente:nombre}).exec((err, campanas)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            campanas: campanas
        });
    });
});

app.get('/:id', autenToken.verificarToken, function(req, res, next){
    Campana.findById(req.params.id, (err, campana)=>{ 
        if(err){ 
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            campana: campana
        });
    });
});

app.post('/', autenToken.verificarToken, (req, res)=>{
    var body = req.body;
    var campana = new Campana({
        cliente: body.cliente,
        nombre: body.nombre,
        fecha: body.fecha,
        hora: body.hora,
        arrayField: body.arrayField,
        arraySelect: body.arraySelect
    });
    campana.save((err, campanaGuardada)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear campaña',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            campana: campanaGuardada
        });
    }); 
});

app.put('/:id', autenToken.verificarToken, function(req, res, next){
    Campana.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err); 
        res.json({ 
            ok: 'true',
            mensaje: 'Campaña actualizada'
        });
    });
});

app.delete('/:id', autenToken.verificarToken, function(req, res, error){
    Campana.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Campaña ' + datos.nombre + ' eliminada';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });

});

module.exports = app;
