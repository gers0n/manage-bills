const express = require('express');
const Cuenta = require('../models/cuenta');
const cuentaHandler = require('../handlers/cuentasHandler');

const routes = express.Router()
	.use( function middleware(req, res, next) {
		console.log("Every pass throught here");
		next();
	}) //middleware
	
	.get( '/', (req, res) => {
		res.status(200).json({message: "hooray, welcome to ourt get api"});
	})// /api/ get route
	.post( '/', (req, res) => {
		res.status(201).json({message: "hooray, welcome to ourt post api"});
	}); // /api/ post route

	routes.route('/cuenta/:Id')
		.get(cuentaHandler.getCuentaById)
		.patch(cuentaHandler.updateCuentaById)
		.delete(cuentaHandler.removeCuentaById);

	routes.route('/cuentas')
		.get(cuentaHandler.getAllCuentas)
		.post(cuentaHandler.createCuenta);

exports.routes = routes;