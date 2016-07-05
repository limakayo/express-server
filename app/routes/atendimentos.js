var express 		= require('express');
var router 			= express.Router();
var Atendimento		= require('../models/atendimento')

router.route('/')
	.post((req, res) => {
		var atendimento = new Atendimento();
		atendimento.nome = req.body.nome;
		atendimento.save((err, atendimento) => {
			if (err) res.json(err);
			res.json(atendimento);
		})
	})
	.get((req, res) => {
	    Atendimento.find((err, atendimentos) => {
	      if (err) res.send(err)
	      res.json(atendimentos)
	    })
	})

router.route('/:id')
	.delete((req, res) => {
		Atendimento.remove({ _id: req.params.id }, (err,atendimento) => {
			if (err) res.json(err)
			res.json({ message: 'Succesfully deleted' });
		})
	})

module.exports = router;
