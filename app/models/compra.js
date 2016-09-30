const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}
const db = require("../db");

const CompraSchema = new Schema(Object.assign({}, baseSchema, {
	Suplidor: {type: Schema.Types.ObjectId, ref: 'Suplidor', required: true},
	Productos: [{type: Schema.Types.ObjectId, ref: 'Producto', required: true}]
}));

module.exports = db.model('Compra', CompraSchema);
