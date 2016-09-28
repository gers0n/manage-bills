const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}
const db = require("../../db");

const CompraSchema = new Schema(Object.assign({}, baseSchema, {
	IdSuplidor: {type: db.Schema.Types.ObjectId, ref: 'Suplidor', required: true},
	IdProductos: [{type: db.Schema.Types.ObjectId, ref: 'Producto', required: true}],
}));

module.exports = db.model('Compra', CompraSchema);
