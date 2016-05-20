var express 	  = require('express')
  , app 		    = express()
  , cors        = require('cors')
  , mongoose 	  = require('mongoose')
  , bodyParser 	= require('body-parser')
  , db
  , Cliente		  = require('./app/models/cliente')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://limakayo:132934@ds023500.mlab.com:23500/intranet')

var port = process.env.PORT || 8000

// ROUTES FOR OUR API
// =========================================

var router = express.Router()

// middleware to use for all requests
router.use((req, res, next) => {
	console.log('Something is happening.')
	next() // make sure we go to the next route and don't stop here
})

router.get('/', (req, res) => {
	res.json({ message: 'ola mundo' })
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
