require('dotenv-flow').config();
  const express = require("express");
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('../Documentation/Document.json');
  
  class AppController {
    constructor() {
      this.express = express();
  
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      this.express.use(express.json());
    }
  
    routes() {
      this.express.use(require("./router"));
    }
  }
  
  module.exports = new AppController().express;