var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    nick: String,
    email: String,
    password: String,
    legales: Boolean,
    rol: String
});

// UsuarioSchema.plugin(unique, {message: 'Nombre de usuario ya se encuentra en uso'});

module.exports = mongoose.model('Usuario', UsuarioSchema);
