var express 		= require('express');
var router 			= express.Router();
var Transporte		= require('../models/transporte')

router.route('/')
	.post((req, res) => {
		var transporte = new Transporte();
		transporte.nome = req.body.nome;
		transporte.save((err, transporte) => {
			if (err) res.json(err);
			res.json(transporte);
		})
	})
	.get((req, res) => {
	    Transporte.find((err, transportes) => {
	      if (err) res.send(err)
	      res.json(transportes)
	    })
	})

router.route('/:id')
	.delete((req, res) => {
		Transporte.remove({ _id: req.params.id }, (err,transporte) => {
			if (err) res.json(err)
			res.json({ message: 'Succesfully deleted' });
		})
	})

module.exports = router;
