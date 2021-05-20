'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Beneficio', { 
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER 
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipoDesconto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desconto: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      tipoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoBeneficio',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
