var mongoose = require('mongoose');

var DatosJugadorSchema = new mongoose.Schema({ 
    jugador: String,
    cliente: String,    
    campana: String,
    datos: Array
});

module.exports = mongoose.model('Dato', DatosJugadorSchema);
