var express = require('express');
var bcryptjs = require('bcryptjs');

var Resultado = require('../models/resultado');

var app = express();

app.get('/', (req, res, next)=> {

    Resultado.find({}).exec((err, resultados)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
           ok: true,
             resultados: resultados
         })
    });
});

app.post('/', function(req, res, next){
    var body = req.body;
    var resultado = new Resultado({
        nombre:body.nombre,
        tiempo: body.tiempo,
        realizado: body.realizado,
        aciertos: body.aciertos,
        fallos: body.fallos,
        fecha: body.fecha
    })

    resultado.save((err, datos)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el resultado',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Resultado creado correctamente'
        })
    })
})

// app.put('/:id', (req, res, next)=>{

//     var body = req.body;

//     Resultado.findById(req.params.id, (err, resultado)=>{
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error de conexión'
//             })
//         }

//         resultado.nombre = body.nombre;
//         resultado.tiempo = body.tiempo;

//         resultado.save((err, resultadoModificado)=>{
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'Error al actualizar el resultado',
//                     errores: err
//                 })
//             }

//             res.status(200).json({
//                 ok: true,
//                 mensaje: 'Resultado actualizado correctamente'
//             })
//         })
//     })
// })

// app.delete('/:id', function(req, res, error){

//     Resultado.findByIdAndRemove(req.params.id, function(err, datos){
//         var mensaje = 'Resultado eliminado';         
//         res.status(201).json({
//             ok: 'true',
//             mensaje: mensaje
//         });
//     })
// });

app.delete('/', function(req, res, error){
    
        Resultado.remove({}).exec(req, function(err, datos){
            var mensaje = 'Resultados eliminados';         
            res.status(201).json({
                ok: 'true',
                mensaje: mensaje
            });
        })
    });

module.exports = app;