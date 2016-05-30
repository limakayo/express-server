var express 	  = require('express')
  , app 		    = express()
  , cors        = require('cors')
  , jwt         = require('express-jwt')
  , mongoose 	  = require('mongoose')
  , bodyParser 	= require('body-parser')
  , db
  , util        = require('util')
  , Cliente		  = require('./app/models/cliente')
  , Ordem       = require('./app/models/ordem')
  , User        = require('./app/models/user')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

var authCheck = jwt({
  secret: new Buffer('6zUREAF9DEnjZ75eNZLfrkHcoR5oy5MbhyDAzmNmHilQynIxeb6EeT0iZiiTcr_L', 'base64'),
  audience: 'MxDo1msOA6oBtY7IYmQTMHnQ6YsU3x2a'
})

mongoose.connect('mongodb://limakayo:132934@ds023500.mlab.com:23500/intranet')

var port = process.env.PORT || 8000

// ROUTES FOR OUR API
// =========================================

var router = express.Router()

// middleware to use for all requests
router.use(authCheck, (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.json({ error: 'Não autorizado' })
  } else {
    console.log('Something is happening.')
  	next() // make sure we go to the next route and don't stop here
  }
})

router.route('/ordens')
  .post((req, res) => {
    var ordem = new Ordem()
    ordem.numero = req.body.numero
    ordem.save((err) => {
      if (err) res.json(err)
      else res.json({ ordem })
    })
  })
  .get((req, res) => {
    Ordem.find((err, ordens) => {
      if (err) res.send(err)
        res.json({ ordens })
    })
  })

router.route('/users')
  .post((req, res) => {
    /*User.findOne({email: req.body.user.email }, (err, user) => {

      if (err) res.json(err)

      if (user) {
        res.json({ 'user': user })
      } else {
        var user = new User()
        user.email = req.body.user.email
        user.role = req.body.user.roles[0]

        user.save((err) => {
          if (err)
            res.json(err)
          else
            res.json({ user })
        })
      }

    })*/
    res.json(req.user.app_metadata.roles[0])
  })
  .get((req, res) => {
    /*User.find((err, users) => {
      if (err) res.send(err)
      res.json({ users })
    })*/

    res.json(req.user)
  })

router.route('/users/:email')
  .get((req, res) => {
    User.findOne({ email: req.params.email }, (err, user) => {
      res.json(user)
    })
  })

router.route('/clientes')
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
      res.json({ clientes })
    })
	})

router.route('/clientes/:id')
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

// REGISTER OUR ROUTES ----------------------

app.use('/api', router)

app.listen(port)
console.log('magic happens on port' + port)

/*

db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
	app.listen(3000, () => {
		console.log('oi')
	})
})*/
