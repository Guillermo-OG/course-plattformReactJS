const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Elementos = sequelize.define(
	"elementos",
	{
		Id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Descricao: Sequelize.STRING,
		chaveGUID: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV4,
		},
		Tipo: Sequelize.STRING,
		IdPai: Sequelize.INTEGER,
		Ativo: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		},
		Link: Sequelize.STRING,
	},
	{
		//options
		timestamps: false,
	}
);

module.exports = Elementos;
