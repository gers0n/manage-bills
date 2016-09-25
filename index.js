'use strict'

const express = require('express');
const app   = express();
const bodyParser = require('body-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);


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
app.get('/views/css/:filename', function(req, res) {
  // res.send('hello world');
  if(ignoreJsFileList.indexOf(req.params.filename) < 0){
   res.sendfile('./views/css/'+req.params.filename);
  }
});

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

