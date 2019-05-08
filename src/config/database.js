var dotenv = require('dotenv');

if(process.env.NODE_ENV="test"){
  dotenv.config({path: '.env.test'}); // most important values
}else{
  dotenv.config({path: '.env'}); // fill in the gaps
}

  module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || "mysql",
    storage: "./__tests__/database.sqlite",
    operatorsAliases: false,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  };