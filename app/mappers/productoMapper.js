'use strict'

module.exports.fromRequest = (producto) => {
	return {
		Nombre: producto.Nombre || "",
		CodigoProducto: producto.CodigoProducto || "",
		Precio: producto.Precio || 0,
		Cantidad: producto.Cantidad || 0,
		Medida: producto.Medida || "",
		Suplidor: producto.Suplidor || ""
	};
};


module.exports.toResponse = (producto) => {
	return {
		Nombre: producto.Nombre || "",
		CodigoProducto: producto.CodigoProducto || "",
		Precio: producto.Precio || 0,
		Cantidad: producto.Cantidad || 0,
		Medida: producto.Medida || "",
		Suplidor: producto.Suplidor || ""
	};
};