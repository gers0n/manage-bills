const mongoose = require('mongoose');
const Schema	 = mongoose.Schema;
const baseSchema = {created: {type: Date, default: Date.now}}

// var BearSchema = new Schema({
// 	name: String
// });

const BearSchema = new Schema(Object.assign({}, baseSchema, {
	name: {type:String, required: true, index:{unique:true}}
}));

module.exports = mongoose.model('Bear', BearSchema);