module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define("Categorias", {
        nome: DataTypes.STRING,
        juros: DataTypes.DECIMAL
    });
    return Categoria;
};

