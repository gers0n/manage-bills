'use strict'

const {app, BrowserWindow} = require('electron')
const request = require('request');
// Keep a global reference of the window object, if you don't, the window will
// be clos ed automatically when the JavaScript object is garbage collected.
let win;
const fs = require('fs');
const port = process.env.PORT || 8080; // seting our port
// process.env.IP

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  // win.loadURL(`file://${__dirname}/views/index.html`)
  win.loadURL(`http://localhost:8080/views/index.html`); 

  // var r = request(`http://localhost:9090`); 

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  })
}

function onAppReady(){
    createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onAppReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

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

