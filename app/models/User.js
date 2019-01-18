const Sequelize = require('sequelize');
const DatabaseService = require('../services/DatabaseService.js');
const con = DatabaseService.getConnection();

//console.log('con', con);
var User = con.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
}, {timestamps: false});

User.sync({force: false});

module.exports = User;