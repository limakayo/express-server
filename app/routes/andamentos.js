var express 		= require('express');
var router 			= express.Router();
var Andamento		= require('../models/andamento')

router.route('/')
	.post((req, res) => {
		var andamento = new Andamento();
		andamento.nome = req.body.nome;
		andamento.save((err, andamento) => {
			if (err) res.json(err);
			res.json(andamento);
		})
	})
	.get((req, res) => {
	    Andamento.find((err, andamentos) => {
	      if (err) res.send(err)
	      res.json(andamentos)
	    })
	})

router.route('/:id')
	.delete((req, res) => {
		Andamento.remove({ _id: req.params.id }, (err,andamento) => {
			if (err) res.json(err)
			res.json({ message: 'Succesfully deleted' });
		})
	})

module.exports = router;
