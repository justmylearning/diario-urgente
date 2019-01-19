const Service = require('./Service.js');

module.exports = class PostService extends Service{
    //Model -> Model class
    //sequelize -> instanceof DB

    constructor(){
        super('Post');
    }
}