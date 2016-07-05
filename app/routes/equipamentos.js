var express 	     	= require('express');
var router 			    = express.Router();
var Equipamento		  = require('../models/equipamento')

router.route('/')
	.post((req, res) => {
		var equipamento = new Equipamento()
		equipamento.nome = req.body.nome

		equipamento.save((err) => {
			if (err)
        res.send(err)
			else {
			  res.json(equipamento)
			}
		})
	})
	.get((req, res) => {
		//res.json({ role: req.user.app_metadata.roles[0] })
    Equipamento.find((err, equipamentos) => {
      if (err) res.send(err)
      res.json(equipamentos)
    })
	})

router.route('/:id')
	.get((req, res) => {
		Equipamento.findById(req.params.id, (err, equipamento) => {
			if (err) res.send(err)
			res.json(equipamento)
		})
	})
	.put((req, res) => {
		Equipamento.findById(req.params.id, (err, equipamento) => {
			if (err)
        res.send(err)
      else {
        equipamento.nome = req.body.equipamento.nome
        equipamento.save((err) => {
          if (err)
            res.send(err)
          else
            res.json({ equipamento: equipamento, message: 'Equipamento atualizado com sucesso' })
        })
      }
		})
	})
	.delete((req, res) => {
		Equipamento.remove({ _id: req.params.id }, (err, equipamento) => {
			if (err) res.send(err)
			res.json({ message: 'Succesfully deleted' })
		})
	})

module.exports = router;
