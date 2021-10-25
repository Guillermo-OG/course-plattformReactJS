const Sequelize = require('sequelize');

const sequelize = new Sequelize('Dase-de-Batos', 'sa', 'password', {
  dialect: 'mssql',
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename:'SQLEXPRESS',
        trustServerCertificate: true
    }
  }
});

module.exports = sequelize;
