module.exports = (sequelize, Sequelize) => {
    const Beneficio = sequelize.define('Beneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        descricao: Sequelize.STRING,
        tipoDesconto: Sequelize.STRING,
        desconto: Sequelize.FLOAT
    });

    Beneficio.associate = (models) => {
        Beneficio.belongsTo(models.TipoBeneficio, { foreingKey: 'tipoBeneficio', as: 'tipoBeneficio'});
    }
    
    return Beneficio;
}