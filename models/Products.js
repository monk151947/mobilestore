var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
	name: String,
    price: Number,
    quantity: Number,
    updatedAt: {
	    type: Date
	  },
   createdAt: {
    type: Date,
    default: new Date()
  }
}, {strict: false});

module.exports = productsSchema;
