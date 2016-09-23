'use strict'

const express = require('express');
const app   = express();
const bodyParser = require('body-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);
// var fs = require('fs');
const birds = require('./router/birds');

// app.use('/birds', birds);
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  // res.send('hello world');
  res.sendfile('./views/index.html');
});

app.get('/views/js/:filename', function(req, res) {
  // res.send('hello world');
  if(ignoreJsFileList.indexOf(req.params.filename) < 0){
   res.sendfile('./views/js/'+req.params.filename);
  }
});
// Métodos de ruta
// Un método de ruta se deriva de uno de los métodos HTTP y se adjunta a una instancia de la clase express.

// El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.


// GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage');
// });

// // POST method route
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage');
// });

// var options = {
//    key  : fs.readFileSync('server.key'),
//    cert : fs.readFileSync('server.crt')
// };


// https.createServer(options, app).listen(3000, function () {
//    console.log('Started!');
//    console.log('Example app listening on port 3000!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

http.listen(3000, function(){
	console.log('The magic is in port :3000');
});

var ignoreJsFileList = [];
var products = [];

function ProductModel(data){
	this.product = data.product || '';
	this.price = parseInt(data.price) || 0;
}

io.on('connection', function(socket){
  console.log('a user is connected');

  socket.on('disconnect', function(){
    console.log('User disconnected');
  });

  socket.on('new product', function(data){
  	var product = new ProductModel(data);
  	products.push(product);
  	io.emit('new product', product);
  });
});

