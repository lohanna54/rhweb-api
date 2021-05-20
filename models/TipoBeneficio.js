module.exports = (sequelize, Sequelize) => {
    const TipoBeneficio = sequelize.define('TipoBeneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        descricao: Sequelize.STRING,
    });

    TipoBeneficio.associate = (models) => {
        TipoBeneficio.hasMany(models.Beneficio, { foreingKey: 'tipoBeneficio', as: 'tipoBeneficio'})
    }
    return TipoBeneficio;
}