module.exports = (sequelize, Sequelize) => {
    const TipoBeneficio = sequelize.define('TipoBeneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        descricao: Sequelize.STRING
    });

    TipoBeneficio.associate = (models) => {
        TipoBeneficio.hasOne(models.Beneficio, { foreingKey: 'tipoId', as: "tipo"})
    }
    return TipoBeneficio;
}