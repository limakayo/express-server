var mongoose 			= require('mongoose')
	, Schema   			= mongoose.Schema
	, uniqueValidator 	= require('mongoose-unique-validator')
	, ClienteSchema 	= require('./cliente.js')
	, EquipamentoSchema = require('./equipamento.js')
	, AcessorioSchema 	= require('./acessorio.js')
	, AtendimentoSchema = require('./atendimento.js')
	, TransporteSchema 	= require('./transporte.js')
	, UserSchema 		= require('./user.js')

var ordemSchema = Schema({
	numero: { type: Number, unique: true, required: true },
	cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
	equipamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipamento' },
	acessorios: [ { type: mongoose.Schema.ObjectId, ref: 'Acessorio'} ],
	atendimento: { type: mongoose.Schema.Types.ObjectId, ref: 'Atendimento' },
	transporte: { type: mongoose.Schema.Types.ObjectId, ref: 'Transporte' },
	tecnico: String,
	andamento: { type: String, enum: ['Aberta', 'Fechada', 'Aprovada', 'Reprovada', 'Aguardando', 'Entregue', 'Garantia', 'Avaliada'] },
	aprovacao: Number,
	marca: String,
	modelo: String,
	serie: String,
	defeito: String,
	defeito_tecnico: String,
	solucao: String,
	solucao_tecnica: String,
  	pecas: String,
	valor_mo: String,
	valor_pecas: String,
	valor_total: String,
	data_hora_orcamento: Date,
	data_hora_aprovacao: Date,
	data_hora_pronto: Date,
	data_hora_fechado: Date,
	data_hora_entregue: Date,
	origem: String,
	prazo: String,
	condicao: String,
	observacoes: String,
	numero_nfe: Number,
	forma_pagamento: String,
	data_pagamento: String,
}, { timestamps: true });

ordemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Ordem', ordemSchema)
