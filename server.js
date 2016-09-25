'use strict'

const express = require('express');
const app   = express();
const bodyParser = require('body-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

// BASE SETUP SECTION
const mongoose = require('mongoose');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
// mongoose.connect('mongodb://localhost:27017/local');
// mongoose.connect('mongodb://localhost:27017/tutorialExpressDB');
mongoose.connect('mongodb://localhost:27017/BillsMgmDB');
const Cuenta = require('./app/models/cuenta');
// const Bear = require('./app/models/bear');

// app.get('/', function(req, res) {
//   // res.send('hello world');
//   res.sendfile('./views/index.html');
// });

// app.get('/views/js/:filename', function(req, res) {
//   // res.send('hello world');
//   if(ignoreJsFileList.indexOf(req.params.filename) < 0){
//    res.sendfile('./views/js/'+req.params.filename);
//   }
// });

function getContentType(url){
  var type = '';
  if(url.indexOf('html') >= 0){
    type = 'text/html';
  } else if(url.indexOf('js') >= 0) {
    type = 'text/javascript'
  } else if(url.indexOf('css') >= 0) {
    type = 'text/css'
  }
  return type;
}

function manageFrontendRequest(req, res){
  if(req.url){
    var contextType = getContentType(req.url);
    res.writeHead(200, {'Content-Type': contextType});
    console.log(req.url, contextType);
    fs.createReadStream(__dirname+req.url).pipe(res);
  } else {
    // res.writeHead(400, {'Content-Type': 'text/html'});
  }
}

app.get('/views/:filename', manageFrontendRequest);
app.get('/views/js/:filename', manageFrontendRequest);
app.get('/views/css/:filename', manageFrontendRequest);


//configure app to use bodyParser() to get the data from a post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // seting our port

// ROUTES FOR OUR API
const router = require('./app/routers/router');

//this is for Register out routes, everything will come from /api
app.use('/api', router.routes);

//here we start the server
// app.listen(port);
// console.log('Magic happens on port '+port);

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

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
    var jQuery = $;
});


 http.listen(port, function(){
    console.log('The magic is in port :3000');
 });
 