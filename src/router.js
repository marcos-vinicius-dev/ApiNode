const routes = require('express').Router();
const CategoriaController = require('./app/controllers/CategotiaController');
const ProdutoController = require('./app/controllers/ProdutoController');

routes.post('/categorias', CategoriaController.store);
routes.get('/categorias', CategoriaController.index); 
routes.get('/categorias/:id', CategoriaController.show); 
routes.put('/categorias/:id', CategoriaController.update); 
routes.delete('/categorias/:id', CategoriaController.destroy);

routes.post('/produtos', ProdutoController.store);
routes.get('/produtos', ProdutoController.index); 
routes.get('/produtos/:id', ProdutoController.show); 
routes.put('/produtos/:id', ProdutoController.update); 
routes.delete('/produtos/:id', ProdutoController.destroy);

module.exports = routes;