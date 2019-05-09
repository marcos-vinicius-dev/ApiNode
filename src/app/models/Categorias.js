module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define("Categorias", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo descrição não pode ser vazio."
                }
            }
        },
        juros: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo juros não pode ser vazio."
                }
            },
        }
    });
    return Categoria;
};

