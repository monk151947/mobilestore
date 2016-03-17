var _ = require('lodash'),
  mongoose = require('mongoose'),
  data = require('../lib/dbConnection') ();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('../config')
  , secret = require('../config/secret')

var key = secret.key.accessKeyId

 module.exports = function(app) {

  var users = {};
   users.authenticate = function(req, res, next) {
   	var User = data.User();
   	// find the user
	  User.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      if (user.password != req.body.password) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign(user, key, {
	          expiresInMinutes: 1440 // expires in 24 hours0
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });

   }
   users.create = function(req, res, next) {
    var User = data.User();    
	var UserModel = new User(req.body);
	  UserModel.save(function(err) {
	    if (err) throw err;

	    console.log('User saved successfully');
	    res.json({ success: true });
	  });
	}

	users.getUsers = function(req, res, next) {
    var User = data.User();    
	  User.find({}, function(err, users) {
	    if (err) throw err;
	    res.json(users)
	  });
	}

 return users;
}