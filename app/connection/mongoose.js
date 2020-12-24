
var mongoose = require('mongoose');
var dbPath  = `${process.env.mongoURI}/${process.env.db}?retryWrites=true&w=majority`;
mongoose.connect(dbPath,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connection open");
});

module.exports = db;