'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      idCategoria: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'categorias',
          key: 'id'
        },
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produtos')
  
  }
};
