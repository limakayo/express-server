var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema   = mongoose.Schema

var equipamentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

equipamentoSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Equipamento', equipamentoSchema)
