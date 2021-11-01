const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const HistoricoElementos = sequelize.define('HistoricoElementos', {
  IdElemento: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IdUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dataAcesso: {
    type: Sequelize.DATE,
    allowNull: false
  }  
},{//options
  timestamps: false
});

module.exports = HistoricoElementos;
