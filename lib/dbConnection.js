var mongoose = require('mongoose');
var config = require('../config');
var productsSchema = require('../models/Products');
var userSchema = require('../models/User');

var options = {replset:
   {auto_reconnect: true,
     poolSize: 10,
    socketOptions: {keepAlive: 1}
   }, server: 
   {auto_reconnect: true,
     poolSize: 10,
    socketOptions: {keepAlive: 1}
   }
};
var connections = {};

module.exports = function() {

  var data = {};
  
  //Dashboard admin database models
  data.Products = function() {
    return connections['mobile_store_conn'].model('Products', productsSchema);
  }

  data.User = function() {
    return connections['mobile_store_conn'].model('User', userSchema);
  }
  data.createDatabaseConnections = function() {
    connections['mobile_store_conn'] = mongoose.createConnection(config.databases.store, options);
    
  }

  return data;
};