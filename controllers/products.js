var _ = require('lodash'),
  mongoose = require('mongoose'),
  data = require('../lib/dbConnection') ();


 module.exports = function(app) {

  var products = {};

  products.create = function(req, res, next) {
    var Product = data.Products();    
    var ProductModel = new Product(req.body);

    ProductModel.save(function(err, product) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: product
            })
        }
    })
  };

  products.getProducts = function(req, res, next) {
  	var Products = data.Products();     

    Products.find()
      .exec(function(err, products) {
		 if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: products
            })
        }      
    });

   };

   products.getProduct = function(req, res, next) {
  	var Product = data.Products();     

    Product.find({_id: req.params.id})
      .exec(function(err, product) {
		 if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Product: " + req.params.id + " not found"
            })
        } else {
        	if(product.length > 0){
        		res.json({
	             type: true,
	             data: product
	        })
        	}
        	else
        	{
        		res.json({
	             type: false,
	             data: "Product: " + req.params.id + " not found"
	        })
        	}
	    	                		
        }      
    });

   };

   products.updateProduct = function(req, res, next) {
  	var Product = data.Products();     
  	var id = req.params.id

    Product.findOne({_id: id})
    .exec(function(err, product) {
      
		 if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
          	if(product){
              product.name = req.body.name
              product.price = req.body.price
              product.quantity = req.body.quantity

          		product.save(function(err, product) {
				        if (err) {
				            res.status(500);
				            res.json({
				                type: false,
				                data: "Error occured: " + err
				            })
				        } else {
				            res.json({
				                type: true,
				                data: product
				            })
				        }
				    });
          	}
          	else {
          		res.json({
                type: false,
                data: "Product" + id +"not updated"
              }) 
          }
            
        }      
    });

   };

  products.deleteProduct = function(req, res, next) {
  	var Product = data.Products();     

    Product.remove({_id: req.params.id})
      .exec(function(err, product) {
		 if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
	    	res.json({
	             type: true,
	             data: "Product: " + req.params.id + " deleted successfully"
	        })                		
        }      
    });

   };


  return products;
}