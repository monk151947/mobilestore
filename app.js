
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var dbConnection = require('./lib/dbConnection') ();
var stage = process.env.NODE_ENV || 'development';
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('./config')
  , secret = require('./config/secret')

var key = secret.key.accessKeyId

//Custom modules
var config = require('./config');

var app = express();

app.set('port', process.env.PORT || 3000);
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(function(req, res, next) {

  console.log({
    'User Agent': req.headers['user-agent'],
    'IP Address': req.ip,
    'Path': req.path
  });
  next();
});

// middleware to use for all requests
// route middleware to verify a token
app.use('/api', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, key , function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// We can add the version v1.1
// app.use('/api/v1.1', app.router);
app.use('/', app.router);



app.use(function(err, req, res, next) {
  var status = err.status || 500;
  return res.json(status, {
        message: err.message,
        error: err
    });
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//dbConnection.connectAdminDb();
dbConnection.createDatabaseConnections();

require('./routes') (app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
