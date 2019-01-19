const Model = require('./Model.js');

class User extends Model{
  
  // Sequelize; //Sequelize Class
  // sequelize; //Sequelize DB connection object

  getContext(){
    var sequelizeModel = this.sequelize.define('users', {
      id: {
        type: this.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: this.Sequelize.STRING
      },
      email: {
        type: this.Sequelize.STRING
      },
      password: {
        type: this.Sequelize.STRING
      },
      created_at: {
        type: this.Sequelize.DATE
      },
      updated_at: {
        type: this.Sequelize.DATE
      }
    }, {timestamps: false});
    
    //sequelizeModel.sync({force: false}); //AUTO UPDATE TABLE STRUCTURE
    return sequelizeModel;
  }
}

module.exports = new User().getContext();