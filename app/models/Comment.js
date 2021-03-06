const Model = require('./Model.js');
const CommentLike = require('./CommentLike.js');

class Comment extends Model{
  
  // Sequelize; //Sequelize Class
  // sequelize; //Sequelize DB connection object

  getContext(){
    var sequelizeModel = this.sequelize.define('comments', {
      id: {
        type: this.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      post_id: {
        type: this.Sequelize.INTEGER
      },
      user_id: {
        type: this.Sequelize.INTEGER
      },
      text: {
        type: this.Sequelize.TEXT
      },
      created_at: {
        type: this.Sequelize.DATE
      },
      updated_at: {
        type: this.Sequelize.DATE
      }
    }, {timestamps: false});
    
    //sequelizeModel.sync({force: false}); //AUTO UPDATE TABLE STRUCTURE
    sequelizeModel.hasMany(CommentLike);
    return sequelizeModel;
  }
}

module.exports = new Comment().getContext();