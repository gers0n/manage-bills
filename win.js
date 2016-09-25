'use strict'

var Win = function(){
  const {app, BrowserWindow} = require('electron')
  const fs = require('fs');
  const request = require('request');
  const self = this;
  // Keep a global reference of the window object, if you don't, the window will
  // be clos ed automatically when the JavaScript object is garbage collected.
  
  self.win = undefined;
  self.app = app;
  self.BrowserWindow = BrowserWindow;

  self.createWindow = function (server) {
    // Create the browser window.
    self.win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the self.app.
    // self.win.loadURL(`file://${__dirname}/views/index.html`)
    // self.win.loadURL(`http://localhost:{server.serverOptions.port}/views/index.html`); 
    self.win.loadURL(`http://localhost:8080/views/index.html`); 

    // var r = request(`http://localhost:9090`); 

    // Open the DevTools.
    // self.win.webContents.openDevTools();

    // Emitted when the window is closed.
    self.win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        self.win = null;
    });
  };

  self.onAppReady = function(){
      self.createWindow();
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  // const expApp = require('express')();
  // const http = require('http');//.Server(expApp);

  // console.log(http);
  // http.listen(port, function(){
  //   console.log('The magic is in port :3000');
  // });
  // http.createServer(function(req, res){
  //   res.writeHead(200, {'Content-Type': 'text/plain'});
  //   if(req.url){
  //     fs.createReadStream("./"+__dirname+'/views/'+req.url).pipe(res);
  //   }
  // }).listen(port, process.env.IP)

    self.init = function(){
        self.app.on('ready',self. onAppReady);

        // Quit when all windows are closed.
        self.app.on('window-all-closed', () => {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
              self.app.quit();
            }
        });

        self.app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (win === null) {
              createWindow();
            }
        });
    }

};
var winMgr = new Win();
winMgr.init();
// exports = winMgr;