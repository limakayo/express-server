var express     = require('express');
var router      = express.Router();
var Ordem       = require('../models/ordem');
var moment      = require('moment');
var Cliente     = require('../models/cliente');

moment.locale('pt-BR')

/***** ORDENS *****/
router.route('/')
  // POST ORDEM
  .post((req, res) => {

    var ordem = new Ordem();

    for (var field in Ordem.schema.paths) {
       if ((field !== '_id') && (field !== '__v')) {
          if (req.body.form[field] !== undefined) {
             ordem[field] = req.body.form[field];
          }
       }
    }

    ordem.save((err) => {
      if (err) res.json(err);
      Ordem.populate(ordem, [
        { path: 'cliente' },
        { path: 'equipamento'},
        { path: 'acessorios'}
      ], (err, ordem) => {
        res.json(ordem);
      });
    });

  })
  // GET ORDENS
  .get((req, res) => {

    Ordem.find().populate('cliente').exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })

  })

router.route('/:id')
  .put((req, res) => {
    Ordem.findById(req.params.id, (err, ordem) => {
      if (err) res.json(err)
      else {
        // update fields
        for (var field in Ordem.schema.paths) {
           if ((field !== '_id') && (field !== '__v')) {
              if (req.body.form[field] !== undefined) {
                 ordem[field] = req.body.form[field];
              }
           }
        }
        ordem.save((err) => {
          if (err) res.json(err)
          Ordem.populate(ordem, [
            { path: 'cliente'},
            { path: 'equipamento'},
            { path: 'acessorios'},
            { path: 'atendimento'}
          ], (err, ordem) => {
            res.json(ordem);
          })
        })
      }
    })
  });

router.route('/cobrancas/:id')
  .get((req, res) => {

    var cliente = Cliente.findOne({ '_id' : req.params.id } , (err, cliente) => {
      if (err) res.send(err)
      Ordem.find({
        cliente: cliente,
        valor_total: { $nin: [null, ""] },
        $and: [
  				{ $or: [{ data_pagamento: null },{ data_pagamento: '' }] },
          { $or: [{ andamento: 'Fechada' },{ andamento: 'Entregue' }] }
  			],
      })
        .populate('equipamento')
        .exec((err, ordens) => {
          if (err) res.json(err);
          res.json(ordens);
        })
    })

  })

  router.route('/cobrancas')
    .get((req, res) => {

        Ordem.find({
          valor_total: { $nin: [null, ""] },
          $and: [
    				{ $or: [{ data_pagamento: null },{ data_pagamento: '' }] },
            { $or: [{ andamento: 'Fechada' },{ andamento: 'Entregue' }] }
    			],
        })
        .exec((err, ordens) => {
          if (err) res.json(err);
          res.json(ordens);
        })

    })

router.route('/abertas/:id')
  .get((req, res) => {

    var cliente = Cliente.findOne({ '_id' : req.params.id } , (err, cliente) => {
      if (err) res.send(err)
      Ordem.find({
        cliente: cliente,
        $and: [
          {
            $or: [
              {andamento: 'Aprovada'},
              {andamento: 'Reprovada'},
              {andamento: 'Aguardando'},
              {andamento: 'Aberta'},
              {andamento: 'Avaliada'},
              {andamento: 'Garantia'}
            ]
          },
        ]
      })
        .populate('equipamento')
        .exec((err, ordens) => {
          if (err) res.json(err);
          res.json(ordens);
        })
    })

  })

router.route('/saidas/:id')
  .get((req, res) => {

    var cliente = Cliente.findOne({ '_id' : req.params.id } , (err, cliente) => {
      if (err) res.send(err);
      Ordem.find({ 'cliente': cliente, 'andamento': 'Fechada' })
        .populate('equipamento')
        .exec((err, ordens) => {
          if (err) res.json(err)
          res.json(ordens)
        })
    })

  })

router.route('/fechadas/:id')
  .get((req, res) => {

    var cliente = Cliente.findOne({ '_id' : req.params.id } , (err, cliente) => {
      if (err) res.send(err)
      Ordem.find({
        cliente: cliente,
        $and: [
          { $or: [{andamento: 'Entregue'}, {andamento: 'Fechada'}] },
        ]
      })
        .populate('equipamento')
        .exec((err, ordens) => {
          if (err) res.json(err);
          res.json(ordens);
        })
    })

  })

router.route('/avaliadas')
  .get((req, res) => {
    Ordem.find({ 'andamento': 'Avaliada' })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })
  })

router.route('/abertas')
  .get((req, res) => {
    Ordem.find({ 'andamento': 'Aberta' })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })
  })

router.route('/aprovadas')
  .get((req, res) => {
    Ordem.find({ 'andamento': 'Aprovada' })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })
  })

router.route('/reprovadas')
  .get((req, res) => {
    Ordem.find({ 'andamento': 'Reprovada' })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })
  })

router.route('/garantias')
  .get((req, res) => {
    Ordem.find({ 'andamento': 'Garantia' })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordens) => {
      if (err) res.json(err)
      res.json(ordens)
    })
  })

router.route('/next')
  .get((req, res) => {
    Ordem.findOne().sort({createdAt: -1}).exec((err, ordem) => {
      if (err) res.json(err);
      var next = ordem.numero + 1;
      res.json(next)
    })
  })

router.route('/:numero')
  .get((req, res) => {
    Ordem.findOne({ numero: req.params.numero })
    .populate('cliente equipamento acessorios atendimento transporte')
    .exec((err, ordem) => {
      if (err) res.json(err)
      if (!ordem)
        res.json({ error: "Ordem não encontrada."})
      else {
        res.json({ ordem })
      }
    })
  })
  .delete((req, res) => {
		Ordem.remove({ _id: req.params.id }, (err, cliente) => {
			if (err) res.send(err)
			res.json({ message: 'Succesfully deleted' })
		})
	})

module.exports = router;
