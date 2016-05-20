var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema   = mongoose.Schema

var clienteSchema = new Schema({
	nome: { type: String, unique: true, required: true }
})

clienteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Cliente', clienteSchema)
