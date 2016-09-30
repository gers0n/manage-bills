const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db');
const baseSchema = {created: {type: Date, default: Date.now}};

const ProductoSchema = new Schema(Object.assign({}, baseSchema, {
	CodigoProducto: {type:String, required: true, index:{unique:true}},
	Nombre: {type:String, default:'', required: true},
	Precio: {type:Number, default:0, min:0},
	Cantidad: {type:Number, default:1, min:1},
	Medida: {type:String, default:'Unidades', required: true, enum: ['Unidades', 'Libras']},
	Suplidor: {type: Schema.Types.ObjectId, ref:'Suplidor'}
}));

module.exports = db.model('Producto', ProductoSchema);
