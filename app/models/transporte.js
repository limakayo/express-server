var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema   = mongoose.Schema

var transporteSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

transporteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Transporte', transporteSchema)
