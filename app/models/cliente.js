var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var ClienteSchema = new Schema({
	nome: String
})

module.exports = mongoose.model('Cliente', ClienteSchema)
