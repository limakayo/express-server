var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema   = mongoose.Schema

var userSchema = new Schema({
	email: { type: String, unique: true, required: true },
  	role:  { type: String }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
