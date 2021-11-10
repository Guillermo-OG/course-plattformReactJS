const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const HistoricoElementos = sequelize.define(
	"HistoricoElementos",
	{
		guidElemento: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		IdUsuario: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		dataAcesso: {
			type: Sequelize.DATE,
			allowNull: false,
		},
	},
	{
		//options
		timestamps: false,
	}
);

module.exports = HistoricoElementos;
