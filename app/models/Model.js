const SequelizeClass = require('sequelize');
const DatabaseService = require('../services/DatabaseService.js');
const sequelizeConnection = DatabaseService.getConnection();

module.exports = class Model{
    Sequelize; //Sequelize Class
    sequelize; //Sequelize DB connection object
    constructor(){  
        this.Sequelize = SequelizeClass;
        this.sequelize = sequelizeConnection;
    }
}