// BASE SETUP SECTION
const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/BillsMgmDB');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
// mongoose.connect('mongodb://localhost:27017/local');
// mongoose.connect('mongodb://localhost:27017/tutorialExpressDB');
