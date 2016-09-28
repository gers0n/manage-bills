
const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}
const db = require("../../db");


// const CuentaSchema = new Schema(Object.assign({}, baseSchema, {
	// nombre_usuario: {type:String, required: true, index:{unique:true}},
	// nombre: {type:String, required: true},
	// apellido: {type:String, required: true},
	// password: {type:String, required: true}
// }));
const CuentaSchema = new Schema(Object.assign({}, baseSchema, {
	NombreUsuario: {type:String, required: true, index:{unique:true}}
	Name: {type:String, required: true}
	Password: {type:String, required: true, min: 8}
}));

module.exports = db.model('Cuenta', CuentaSchema);
