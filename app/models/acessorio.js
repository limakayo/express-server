var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var OrdemSchema = require('./ordem.js');

var Schema   = mongoose.Schema

var acessorioSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

acessorioSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Acessorio', acessorioSchema)
