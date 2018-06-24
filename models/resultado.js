var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ResultadoSchema = new mongoose.Schema({
    nombre: String,
    tiempo:String,
    realizado:String,
    aciertos:Number,
    fallos:Number,
    fecha:String
})

module.exports = mongoose.model('Resultado', ResultadoSchema);
