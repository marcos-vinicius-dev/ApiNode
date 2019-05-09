module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define("Produtos", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo nome não pode ser vazio."
                }
            },
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo descrição não pode ser vazio."
                }
            },
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo valor não pode ser vazio."
                }
            },
        }
    });
    Produto.associate = function(models){
        Produto.belongsTo(models.Categorias, {
            onDelete: "CASCADE",
            foreignKey: {
                name: "idcategoria",
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Campo idCategoria não pode ser vazio."
                    }
                },
            }
        });
    }
    return Produto;
};

