const Service = require('./Service.js');

module.exports = class PostLikeService extends Service{
    //Model -> Model class
    //sequelize -> instanceof DB

    constructor(){
        super('PostLike');
    }
}