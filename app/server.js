'use strict'

module.exports  = function() {
    var self = this;
    const fs = require('fs');
    // const db = require('./db');
    const Cuenta = require('./models/cuenta');
    const router = require('./routers/router');
    const bodyParser = require('body-parser');
    const Producto = require('./models/producto');
    const Suplidor = require('./models/suplidor');

    self.express = require('express');
    self.serverOptions;
    self.app  = self.express();
    self.http = require('http').Server(self.app);
    self.io = require('socket.io')(self.http);
    self.clietsSockets = [];

    /* ========= manage view ========= */
    var getContentType = (url) => {
        var type = '';
        if(url.indexOf('html') >= 0){
            type = 'text/html';
        } else if(url.indexOf('js') >= 0) {
            type = 'text/javascript'
        } else if(url.indexOf('css') >= 0) {
            type = 'text/css'
        }
        return type;
    };

    var manageFrontendRequest = (req, res)  => {
        if(req.url){
            var contextType = getContentType(req.url);
            res.writeHead(200, {'Content-Type': contextType});
            // console.log(req.url, contextType);
            fs.createReadStream(__dirname+"/UI/"+req.url).pipe(res);
        } else {
            res.writeHead(400, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname+"/UI/views/404.html").pipe(res);
        }
    };

    function errorHandler(res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname+'/views/404.html').pipe(res);
    };

    self.app.get('/views/:filename', manageFrontendRequest);
    self.app.get('/views/js/:filename', manageFrontendRequest);
    self.app.get('/views/css/:filename', manageFrontendRequest);
    
    /* ========= end manage View =========*/

    //configure app to use bodyParser() to get the data from a post
    self.app.use(bodyParser.urlencoded({ extended: true }));
    self.app.use(bodyParser.json());


    // ROUTES FOR OUR API
    //this is for Register out routes, everything will come from /api
    self.app.use('/api', router.routes);


    /*Socket Io events*/
    self.io.on('connection', function(socket){
        console.log('a user is connected with socketId', socket.id);
        self.clietsSockets.push(socket);
          
        socket.on('disconnect', function(){
            console.log('User disconnected');
            self.clietsSockets.pop(socket);
        });
    
        socket.on('agregar producto', function(data){
            var producto = new Producto(data);
            console.log('agregar producto', data);
            console.log('agregar producto', producto);
            socket.emit('agregar producto', producto);
        });

        socket.on('agregar suplidor', function(data){
            console.log(data);
            Suplidor.find({Nombre:data.Nombre}, function(err, suplidor){
                if(!err){
                    return socket.emit('agregar suplidor', suplidor);
                }

                suplidor = new Suplidor(data);
                suplidor.save(function(supErr, supData){
                    if(!supErr){
                        return socket.emit('guardar compra', suplidor);
                    }
                    console.log('error saving suplidor', supErr);
                    socket.emit('guardar compra', {error: supErr});
                })
                
            });
        });
        
    });

    
    self.initServer = function(){
        self.serverOptions = require('./config/config');

        require("jsdom").env("", function(err, window) {
            if (err) {
                console.error(err);
                return;
            }

            var $ = require("jquery")(window);
            var jQuery = $;
        });

        //here we start the server
        // app.listen(self.serverOptions.PORT);
        // console.log('Magic happens on port ',self.serverOptions.PORT);

        self.http.listen(self.serverOptions.PORT, function(){
            console.log('The magic is in port :'+self.serverOptions.PORT);
        });
    };
};
