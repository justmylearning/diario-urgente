const Service = require('./Service.js');

module.exports = class PostCategoryService extends Service{
    //Model -> Model class
    //sequelize -> instanceof DB

    constructor(){
        super('PostCategory');
    }
}