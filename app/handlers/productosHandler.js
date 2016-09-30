'use strict'

const Producto = require('../models/producto');
const mapper = require('../mappers/productoMapper');

module.exports.createProducto = (req, res) => { /*create new producto*/

	Producto.findOne({CodigoProducto: req.body.CodigoProducto}, function(err, producto){
		if(err){
			return res.status(401).json( {'error':'error: '+err});
		} 
		if(producto && producto.length > 0){
			return res.status(401).json( {'error':'El Producto ya existe.',  producto:producto || {}});
		}
		var producto = new Producto(mapper.fromRequest(req.body));
		
		producto.save((err) => {
			if (err) 
				return res.status(401).json({'error':'error: '+err});
			console.log(`Producto #{producto._id} creado`);
			return res.status(201).json({message: 'Producto creado', data: producto});
		});
	});
	
};

module.exports.getProductoById = (req, res) => { /*get a Producto*/
	console.log('params', req.params);
	Producto.findById({Id:req.params.Id}, (err, producto) => {
		if (err)
			return res.status(400).json({error: err});
		console.log(`Producto #{producto._id} enviado`);
		return res.status(201).json({"data": producto});
	});
};

module.exports.updateProductoById = (req, res) => { /*update a producto*/
	Producto.findById({Id:req.params.Id}, (err, producto) => {
		if (err)
			return res.status(401).json({error: err});
		
		Producto.update(req.body, (errUpd) => {
			if (errUpd)
				return res.status(401).json({error: errUpd});
			res.status(202).json({message: "updated the producto #"+req.params.Id+" productos", data: producto});
		});
	});
};

module.exports.removeProductoById = (req, res) => { /*remove a producto*/
	Producto.remove({_id: req.params.Id}, (err, producto) => {
		if (err)
			return res.status(402).json({error: err});
		res.status(202).json({message: "deleting the producto #"+req.params.Id+" productos", data: producto});
	});
};

module.exports.getAllProductos = (req, res) => { /*get all productos*/
	Producto.find({}, (err, productos) => {
		console.log("get all productos", productos);

		if (err)
			return res.status(400).json({error: err});
		return res.status(200).json({message: "get all productos", data: productos})
	});	
};