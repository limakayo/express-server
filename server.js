var express = require('express')
  , app 	= express()
  , MongoClient = require('mongodb').MongoClient
  , db

MongoClient.connect('mongodb://limakayo:132934@ds023432.mlab.com:23432/star-wars-quotes', (err, database) => {
	if (err)
		return console.log(err)
	db = database
	app.listen(3000, () => {
		console.log('ola mundo')
	})
})