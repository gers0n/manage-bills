'use strict'
var Server = function(){
    const self = this;
    const bodyParser = require('body-parser');
    const fs = require('fs');
    const Cuenta = require('./app/models/cuenta');
    const router = require('./app/routers/router');

    self.express = require('express');
    self.app   = self.express();

    self.http = require('http').Server(self.app);
    self.io = require('socket.io')(self.http);
    


    // BASE SETUP SECTION
    self.mongoose = require('mongoose');
    self.mongoose.connect('mongodb://localhost:27017/BillsMgmDB');
    // mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
    // mongoose.connect('mongodb://localhost:27017/local');
    // mongoose.connect('mongodb://localhost:27017/tutorialExpressDB');
    
    
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
        // console.log(req.url, contextType);
        fs.createReadStream(__dirname+req.url).pipe(res);
      } else {
        // res.writeHead(400, {'Content-Type': 'text/html'});
      }
    }

    function errorHandler(){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname+'/views/404.html').pipe(res);
    };

    self.app.get('/views/:filename', manageFrontendRequest);
    self.app.get('/views/js/:filename', manageFrontendRequest);
    self.app.get('/views/css/:filename', manageFrontendRequest);


    //configure app to use bodyParser() to get the data from a post
    self.app.use(bodyParser.urlencoded({ extended: true }));
    self.app.use(bodyParser.json());

    self.serverOptions = {
        port : process.env.PORT || 8080, // seting our port
        IP:  process.env.IP
    };

    // ROUTES FOR OUR API
    

    //this is for Register out routes, everything will come from /api
    self.app.use('/api', router.routes);

    //here we start the server
    // app.listen(port);
    // console.log('Magic happens on port '+port);

    var ignoreJsFileList = [];
    var products = [];

    function ProductModel(data){
        self.product = data.product || '';
        self.price = parseInt(data.price) || 0;
    }

    self.io.on('connection', function(socket){
      console.log('a user is connected');

      socket.on('disconnect', function(){
        console.log('User disconnected');
      });

      socket.on('new product', function(data){
        // var product = new ProductModel(daa);
        // products.push(product);
        console.log(data)
        self.io.emit('new product', data);
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

    self.initServer = function(){
        self.http.listen(self.serverOptions.port, function(){
            console.log('The magic is in port :'+self.serverOptions.port);
        });
    }
    
 
};

module.exports = new Server();