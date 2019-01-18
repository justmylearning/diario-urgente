const DatabaseService = require('./DatabaseService.js');
const sequelize = DatabaseService.getConnection();
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

module.exports = class UserService{

    static async findAll(){
        var users = await User.findAll();
        return users;
    }

    static async create(data){
        data.password = await bcrypt.hash(data.password, 10);
        var user = await User.create(data);
        return user;
    }

    static async findByEmail(email){
        var user = await User.findOne({
            where:{
                email:email
            }
        });

        return user;
    }

    static async first(){
        return await User.first();
    }

}