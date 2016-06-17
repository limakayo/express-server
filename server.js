var express 	  = require('express')
  , cors        = require('cors')
  , mongoose 	  = require('mongoose')
  , bodyParser 	= require('body-parser')
  , db
  , util        = require('util')
  , jwt         = require('express-jwt')

var ordens        = require('./app/routes/ordens')
  , clientes      = require('./app/routes/clientes')
  , users         = require('./app/routes/users')
  , equipamentos  = require('./app/routes/equipamentos')
  , acessorios    = require('./app/routes/acessorios')
  , atendimentos  = require('./app/routes/atendimentos')
  , transportes   = require('./app/routes/transportes')
  , andamentos    = require('./app/routes/andamentos')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://limakayo:132934@ds023500.mlab.com:23500/intranet')

var port = process.env.PORT || 8000

/****** ROUTES ******/

var authCheck = jwt({
  secret: new Buffer('6zUREAF9DEnjZ75eNZLfrkHcoR5oy5MbhyDAzmNmHilQynIxeb6EeT0iZiiTcr_L', 'base64'),
  audience: 'MxDo1msOA6oBtY7IYmQTMHnQ6YsU3x2a'
})

app.use(authCheck, (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.json({ error: 'Não autorizado' })
  } else {
    console.log('Something is happening.')
  	next() // make sure we go to the next route and don't stop here
  }
})

app.use('/api/ordens', ordens);
app.use('/api/clientes', clientes);
app.use('/api/users', users);
app.use('/api/equipamentos', equipamentos);
app.use('/api/acessorios', acessorios);
app.use('/api/atendimentos', atendimentos);
app.use('/api/transportes', transportes);
app.use('/api/andamentos', andamentos);

app.listen(port)
console.log('Magic happens on port: ' + port)
