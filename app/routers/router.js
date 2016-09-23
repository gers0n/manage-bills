const express = require('express');
const Bear = require('../models/bear.js');
const bearHandler = require('../handlers/bearsHandler');

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

	routes.route('/bears/:Id')
		.get(bearHandler.getBearById)
		.patch(bearHandler.updateBearById)
		.delete(bearHandler.removeBearById);

	routes.route('/bears')
		.get(bearHandler.getAllBears)
		.post(bearHandler.createBear);

exports.routes = routes;