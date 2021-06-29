module.exports = (sequelize, Sequelize) => {
    const Beneficio = sequelize.define('Beneficio', {
        /* Todos os Campos Exceto: ID, createdAt, updatedAt */
        descricao: Sequelize.STRING,
        tipoDesconto: Sequelize.STRING,
        desconto: Sequelize.FLOAT,
        //tipoId: Sequelize.INTEGER
        
    });
    
    Beneficio.associate = (models) => {
        Beneficio.belongsTo(models.TipoBeneficio, { foreingKey: 'tipoId', as: "tipo"})
    }
    
    return Beneficio;
}