var express 		= require('express');
var router 			= express.Router();
var Cliente		  = require('../models/cliente')
var Ordem			= require('../models/ordem')

router.route('/')
	.post((req, res) => {
		var cliente = new Cliente()
		cliente.nome = req.body.nome

		cliente.save((err) => {
			if (err)
        res.send(err)
			else {
			  res.json({ cliente })
			}
		})
	})
	.get((req, res) => {
		//res.json({ role: req.user.app_metadata.roles[0] })
    Cliente.find((err, clientes) => {
      if (err) res.send(err)
      res.json(clientes)
    })
	})

router.route('/devedores')
  .get((req, res) => {

  	var clientes = new Array();

  	Ordem.find({
			valor_total: { $nin: [null, ""] },
			$and: [
				{ $or: [{ data_pagamento: null },{ data_pagamento: '' }] },
				{ $or: [{ andamento: 'Fechada' },{ andamento: 'Entregue' }] }
			],
		})
		.populate('cliente')
    .exec((err, ordens) => {
      if (err) res.json(err)

      ordens.forEach((ordem) => {
				clientes.push(ordem.cliente);
	  	})

  	  var arr = {};

  	  for ( var i=0, len = clientes.length; i < len; i++ )
    		arr[clientes[i]['nome']] = clientes[i];

  		clientes = new Array();

  		for ( var key in arr)
				clientes.push(arr[key])

    	res.json(clientes);

    })
  })


router.route('/:id')
	.get((req, res) => {
		Cliente.findById(req.params.id, (err, cliente) => {
			if (err) res.send(err)
			res.json(cliente)
		})
	})
	.put((req, res) => {
		Cliente.findById(req.params.id, (err, cliente) => {
			if (err)
        res.send(err)
      else {
        cliente.nome = req.body.cliente.nome
        cliente.save((err) => {
          if (err)
            res.send(err)
          else
            res.json({ cliente: cliente, message: 'Cliente atualizado com sucesso' })
        })
      }
		})
	})
	.delete((req, res) => {
		Cliente.remove({ _id: req.params.id }, (err, cliente) => {
			if (err) res.send(err)
			res.json({ message: 'Succesfully deleted' })
		})
	})

module.exports = router;
