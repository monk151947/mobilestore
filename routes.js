
module.exports = function(app) {

  var productController = require('./controllers/products') (app);
  var userController = require('./controllers/users') (app);


  app.get('*', function(req, res, next) {
    //Setting  headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '[GET]');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })

 //Root for basic message for testing 
 app.get('/', function(req, res) {
    res.json({ message: 'yahooooo! welcome to our mobile store api!' });   
 });

 app.post('/authenticate', userController.authenticate);
 app.post('/setup', userController.create);
 app.get('/api/users', userController.getUsers);

 //Creating products
 app.post('/api/products', productController.create);
 //List all products
 app.get('/api/products', productController.getProducts);
 //List single product
 app.get('/api/products/:id', productController.getProduct);
 //update the product
 app.put('/api/products/:id', productController.updateProduct);
 //Delete the product
 app.delete('/api/products/:id', productController.deleteProduct);

 

}
