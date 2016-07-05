var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema   = mongoose.Schema

var andamentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

andamentoSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Andamento', andamentoSchema)
