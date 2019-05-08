var dotenv = require('dotenv');

if(process.env.NODE_ENV="test"){
  dotenv.config({path: '.env.test'}); // most important values
}else{
  dotenv.config({path: '.env'}); // fill in the gaps
}
  
  const express = require("express");
  
  class AppController {
    constructor() {
      this.express = express();
  
      this.middlewares();
      this.routes();
    }
  
    middlewares() {
      this.express.use(express.json());
    }
  
    routes() {
      this.express.use(require("./routes"));
    }
  }
  
  module.exports = new AppController().express;