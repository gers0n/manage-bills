'use strict'

const Suplidor = require('../models/suplidor');
const mapper = require('../mappers/suplidorMapper');

module.exports.createSuplidor = (req, res) => { /*create new suplidor*/
	
	Suplidor.find({Nombre: req.body.Nombre}, function(err, suplidor){
		if(err){
			return res.status(401).json( {'error':'error: '+err});
		} 
		if(suplidor.length > 0){
			return res.status(401).json( {'error':'El Suplidor ya existe.'});
		}
		
		var suplidor = new Suplidor(mapper.fromRequest(req.body));
		suplidor.save( (err) => {
			if (err) 
				return res.status(401).json( {'error':'error: '+err});
			return res.status(201).json({message: 'Suplidor creado', data:suplidor});
		});
	});
	
};

module.exports.getSuplidorById = (req, res) => { /*get a Suplidor*/
	Suplidor.findById(req.params.Id, (err, suplidor) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get the suplidor #"+req.params.Id+" suplidor", data: suplidor})
	});
};

module.exports.updateSuplidorById = (req, res) => { /*update a suplidor*/
	Suplidor.findById(req.params.Id, (err, suplidor) => {
		if (err)
			return res.status(401).json({error: err});
		
		Suplidor.update(req.body, (errUpd) => {
			if (errUpd)
				return res.status(401).json({error: errUpd});
			res.status(202).json({message: "updated the suplidor #"+req.params.Id+" suplidors", data: suplidor});
		});
	});
};

module.exports.removeSuplidorById = (req, res) => { /*remove a suplidor*/
	Suplidor.remove({_id: req.params.Id}, (err, suplidor) => {
		if (err)
			return res.status(402).json({error: err});
		res.status(202).json({message: "deleting the suplidor #"+req.params.Id+" suplidors", data: suplidor});
	});
};

module.exports.getAllSuplidores = (req, res) => { /*get all suplidors*/
	Suplidor.find({}, (err, suplidors) => {
		if (err)
			return res.status(400).json({error: err});
		res.status(200).json({message: "get all suplidors", data: suplidors})
	});	
};