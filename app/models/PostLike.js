const Model = require('./Model.js');

class PostLike extends Model{
  
  // Sequelize; //Sequelize Class
  // sequelize; //Sequelize DB connection object

  getContext(){
    var sequelizeModel = this.sequelize.define('post_likes', {
      id: {
        type: this.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: this.Sequelize.INTEGER
      },
      post_id: {
        type: this.Sequelize.INTEGER
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

module.exports = new PostLike().getContext();