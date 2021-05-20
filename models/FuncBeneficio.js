module.exports = (sequelize, Sequelize) => {
    const FuncBeneficio = sequelize.define('FuncBeneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
    });

    // FuncBeneficio.associate = (models) => {
    //     FuncBeneficio.hasMany(models.Funcionario, { foreingKey: 'funcionarioId', as: 'funcionario'}),
    //     FuncBeneficio.hasMany(models.Beneficio, { foreingKey: 'beneficioId', as: 'beneficio'})
    // }
   
    return FuncBeneficio;
}