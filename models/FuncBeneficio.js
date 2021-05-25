module.exports = (sequelize, Sequelize) => {
    const FuncBeneficio = sequelize.define('FuncBeneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
    });

    FuncBeneficio.associate = (models) => {
        FuncBeneficio.belongsTo(models.Funcionario, { foreingKey: 'funcionarioId', as: 'funcionario'}),
        FuncBeneficio.belongsTo(models.Beneficio, { foreingKey: 'beneficioId', as: 'beneficio'})
    }
   
    return FuncBeneficio;
}