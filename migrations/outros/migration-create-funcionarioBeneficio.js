'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FuncBeneficio', { 
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER 
      },
      funcionarioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Funcionario',
          key: 'id'
        },
      },
      beneficioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Beneficio',
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
      },
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
