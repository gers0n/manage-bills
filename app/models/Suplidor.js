const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}
const db = require('../../db');

const SuplidorSchema = new Schema(Object.assign({}, baseSchema, {
	Nombre: {type:String, default:'Suplidor', required: true, index:{unique: true}},
	NumeroTelefonico: {type:String, default:''},
	Identificacion: {type:String, default:''},
}));

module.exports = db.model('Suplidor', SuplidorSchema);