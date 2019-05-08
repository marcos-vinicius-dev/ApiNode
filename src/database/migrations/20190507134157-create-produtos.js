'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
        id: {
          type: Serialize.INTEGER,
          PrimaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull,

        },
        valor: {
          type: Sequelize.DECIMAL,
          allowNull,
        },
      
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produtos')
  }
};
