var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send({hello:'world'});
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

 http.listen(3000, function(){
 	console.log('The magic is in port :3000');
 });
 