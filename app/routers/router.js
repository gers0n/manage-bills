const express = require('express');
const Cuenta = require('../models/cuenta');
const Producto = require('../models/producto');
const Suplidor = require('../models/suplidor');
const Compra = require('../models/compra');

const productosHandler = require('../handlers/productosHandler');
const comprasHandler = require('../handlers/comprasHandler');
const cuentasHandler = require('../handlers/cuentasHandler');
const suplidorHandler = require('../handlers/suplidorHandler');

const routes = express.Router()
	.use( function middleware(req, res, next) {
		console.log("-----------------------");
		console.log("REQUESTED -", req.originalUrl);
		console.log("-receibed -", req.body);
		console.log("-----------------------");
		next();
	}) //middleware
	
	.get( '/', (req, res) => {
		res.status(200).json({message: "hooray, welcome to ourt get api"});
	})// /api/ get route
	.post( '/', (req, res) => {
		res.status(201).json({message: "hooray, welcome to ourt post api"});
	}); // /api/ post route

	/*cuentas*/
	routes.route('/cuenta/:Id')
		.get(cuentasHandler.getCuentaById)
		.patch(cuentasHandler.updateCuentaById)
		.delete(cuentasHandler.removeCuentaById);

	routes.route('/cuentas')
		.get(cuentasHandler.getAllCuentas)
		.post(cuentasHandler.createCuenta);

	/*productos*/
	routes.route('/producto/:Id')
		.get(productosHandler.getProductoById)
		.patch(productosHandler.updateProductoById)
		.delete(productosHandler.removeProductoById);

	routes.route('/productos')
		.get(productosHandler.getAllProductos)
		.post(productosHandler.createProducto);

	/*compras*/
	routes.route('/compra/:Id')
		.get(comprasHandler.getCompraById)
		.patch(comprasHandler.updateCompraById)
		.delete(comprasHandler.removeCompraById)

	routes.route('/compras')
		.get(comprasHandler.getAllCompras)
		.post(comprasHandler.createCompra);

	/*Suplidor*/
	routes.route('/suplidor/:Id')
		.get(suplidorHandler.getSuplidorById)
		.patch(suplidorHandler.updateSuplidorById)
		.delete(suplidorHandler.removeSuplidorById);

	routes.route('/suplidores')
		.get(suplidorHandler.getAllSuplidores)
		.post(suplidorHandler.createSuplidor);

exports.routes = routes;