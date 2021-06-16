const { Sequelize } = require('sequelize')
const db = new Sequelize('uptasknode', 'root', 'sqlroot', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = db;
                            