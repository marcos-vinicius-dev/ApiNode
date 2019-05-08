module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define("Produtos", {
        nome: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        valor: DataTypes.DECIMAL,

    });
    Produto.associate = function(models){
        Produto.belongsTo(models.Categorias, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Produto;
};

