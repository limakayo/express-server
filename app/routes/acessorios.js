var express 		= require('express');
var router 			= express.Router();
var Acessorio		= require('../models/acessorio')

router.route('/')
	.post((req, res) => {
		var acessorio = new Acessorio();
		acessorio.nome = req.body.nome;
		acessorio.save((err, acessorio) => {
			if (err) res.json(err);
			res.json(acessorio);
		})
	})
	.get((req, res) => {
	    Acessorio.find((err, acessorios) => {
	      if (err) res.send(err)
	      res.json(acessorios)
	    })
	})

router.route('/:id')
	.delete((req, res) => {
		Acessorio.remove({ _id: req.params.id }, (err,acessorio) => {
			if (err) res.json(err)
			res.json({ message: 'Succesfully deleted' });
		})
	})

module.exports = router;
