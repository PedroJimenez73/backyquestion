var mongoose = require('mongoose');

var CampanaSchema = new mongoose.Schema({ 
    cliente: String,
    nombre: String,
    fecha: String,
    hora: String,
    arrayField: Array,
    arraySelect: Array
});

module.exports = mongoose.model('Campana', CampanaSchema);