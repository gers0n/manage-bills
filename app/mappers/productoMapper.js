'use strict'

module.exports.fromRequest = (producto) => {
	return producto.CodigoProducto && producto.suplidor ? {
		Nombre: producto.Nombre,
		CodigoProducto: producto.CodigoProducto,
		Precio: producto.Precio,
		Cantidad: producto.Cantidad,
		Medida: producto.AmountIna,
		Suplidor: product.suplidor.Id
	} : {};
};
