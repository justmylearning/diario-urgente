const Service = require('./Service.js');

module.exports = class CommentLikeService extends Service{
    //Model -> Model class
    //sequelize -> instanceof DB

    constructor(){
        super('CommentLike');
    }
}