var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema   = mongoose.Schema

var atendimentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

atendimentoSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Atendimento', atendimentoSchema)
