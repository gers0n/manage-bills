'use strict'

const Compra = require('../models/compra');
const mapper = require('./mappers/compraMapper');

exports.createCompra = (req, res) => { /*create new compra*/
	var compra = new Compra(mapper.fromRequest(req.body));

	compra.save( (err) => {
		if (err) 
			return res.status(401).json({'error':'error: '+err});
		return res.status(201).json({message: 'Compra created', data:compra});
	});
};

exports.getCompraById = (req, res) => { /*get a Compra*/
	Compra.findById(req.params.Id, (err, compra) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get the compra #"+req.params.Id+" compra", data: compra})
	});
};

exports.updateCompraById = (req, res) => { /*update a compra*/
	Compra.findById(req.params.Id, (err, compra) => {
		if (err)
			return res.status(401).json({error: err});
		
		Compra.update(req.body, (errUpd) => {
			if (errUpd)
				return res.status(401).json({error: errUpd});
			res.status(202).json({message: "updated the compra #"+req.params.Id+" compras", data: compra});
		});
	});
};

exports.removeCompraById = (req, res) => { /*remove a compra*/
	Compra.remove({_id: req.params.Id}, (err, compra) => {
		if (err)
			return res.status(402).json({error: err});
		res.status(202).json({message: "deleting the compra #"+req.params.Id+" compras", data: compra});
	});
};

exports.getAllCompras = (req, res) => { /*get all compras*/
	Compra.find({}, (err, compras) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get all compras", data: compras})
	});	
};