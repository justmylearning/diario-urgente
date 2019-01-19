const Model = require('./Model.js');
const Comment = require('./Comment.js');
const PostLike = require('./PostLike.js');

class Post extends Model{
  
  // Sequelize; //Sequelize Class
  // sequelize; //Sequelize DB connection object

  getContext(){
    var sequelizeModel = this.sequelize.define('posts', {
      id: {
        type: this.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_id: {
        type: this.Sequelize.INTEGER
      },
      title: {
        type: this.Sequelize.STRING
      },
      html_content: {
        type: this.Sequelize.TEXT
      },
      created_at: {
        type: this.Sequelize.DATE
      },
      updated_at: {
        type: this.Sequelize.DATE
      }
    }, {timestamps: false});
    
    sequelizeModel.hasMany(Comment, {foreignKey:'post_id'});
    sequelizeModel.hasMany(PostLike, {foreignKey:'post_id'});

    //sequelizeModel.sync({force: false}); //AUTO UPDATE TABLE STRUCTURE
    return sequelizeModel;
  }
}

module.exports = new Post().getContext();