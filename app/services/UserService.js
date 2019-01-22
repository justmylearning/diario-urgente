const bcrypt = require('bcryptjs');
const Service = require('./Service.js');

module.exports = class UserService extends Service{
    //Model ->  Model class
    //sequelize -> instanceof DB

    constructor(){
        super('User');
    }

    async create(data){
        data.password = await bcrypt.hash(data.password, 10);
        return await this.Model.create(data);
    }

    async update(data, where){
        if(data.password)
            data.password = await bcrypt.hash(data.password, 10);
        
        return await this.Model.update(data, {where:where});
    }
}