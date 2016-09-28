'use strict'
// const suplidorMapper = require("./suplidorMapper");
// const productoMapper = require("./productoMapper");
const getAllProductosIds = function(productos) {
	var IdProductos = [];
	for(var i in productos){
		var producto = productos[i];
		IdProductos.push(producto.Id);
	}
	return IdProductos;
};

module.exports.fromRequest = (producto) => {
	return producto.SuplidorId && producto.IdProductos.lenght > 0 ? {
		SuplidorId: producto.Suplidor.Id,
		IdProductos: getAllProductosIds(producto.IdProductos)
	} : {};
};
