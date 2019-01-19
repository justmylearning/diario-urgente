const Service = require('./Service.js');

module.exports = class CommentService extends Service{
    //Model -> Model class
    //sequelize -> instanceof DB

    constructor(){
        super('Comment');
    }
}