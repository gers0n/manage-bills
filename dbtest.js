var Producto = require('./app/models/producto');


function printValue (val){
	console.log('val', val);
}
 Producto.find({}, (err, productos) => {
 	console.log(err);
 	console.log(productos);
 	console.log('starting..');
 });

console.log('Sleeping');
setTimeout(()=>{console.log('timout..');}, 5000);
console.log('after sleep');