var express = require('express');
var bcryptjs = require('bcryptjs');
var Usuario = require('../models/usuario.js');
var app = express();
//var autenToken = require('../middleware/autentoken.js');

app.get('/', (req, res, next)=>{
    Usuario.find({}).exec((err, usuarios)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            usuarios: usuarios 
        });
    });
});

app.get('/:id', function(req, res, next){
    
    Usuario.findById(req.params.id, (err, usuario)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuario
        });
    });
});

app.post('/', function(req, res, next){
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        nick: body.nick,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        legales: body.legales,
        rol: body.rol
    });
    usuario.save((err, datos)=>{ 
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente'
        });
    });
});

// app.put('/:id', (req, res, next)=>{
//     var body = req.body;
//     Usuario.findById(req.params.id, (err, usuario)=>{
//         if(err){
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error de conexión con servidor'
//             });
//         };
//         usuario.nombre = body.nombre;
//         usuario.email = body.email;
//         usuario.rol = body.rol;
//         usuario.save((err, usuarioModificado)=>{
//             if(err){
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'Error al modificar usuario',
//                     errores: err
//                 });
//             };
//             res.status(200).json({
//                 ok: true,
//                 mensaje: 'Usuario actualizado correctamente'
//             });
//         });
//     });
// });

// app.delete('/:id', autenToken.verificarToken, function(req, res, error){
//     Usuario.findByIdAndRemove(req.params.id, function(err, datos){
//         if (err) return next(err);
//         var mensaje = 'Usuario ' + datos.nombre + ' eliminado';
//         res.status(200).json({
//             ok: 'true',
//             mensaje: mensaje
//         });
//     });
// });

module.exports = app;
