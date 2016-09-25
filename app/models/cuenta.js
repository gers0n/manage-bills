
const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}

// var objSchema = new Schema({
// 	name: String
// });

// const CuentaSchema = new Schema(Object.assign({}, baseSchema, {
	// nombre_usuario: {type:String, required: true, index:{unique:true}},
	// nombre: {type:String, required: true},
	// apellido: {type:String, required: true},
	// password: {type:String, required: true}
// }));
const CuentaSchema = new Schema(Object.assign({}, baseSchema, {
	name: {type:String, required: true, index:{unique:true}}
}));

module.exports = mongoose.model('Cuenta', CuentaSchema);
