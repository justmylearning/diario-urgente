const DatabaseService = require('./DatabaseService.js');
const sequelizeConn = DatabaseService.getConnection();

module.exports = class Service{

    Model;
    sequelize = sequelizeConn;

    constructor(modelName){
        this.Model = require(`../models/${modelName}.js`);
    }

    async create(data){
        var model = await this.Model.create(data);
        return model;
    }

    async first(){
        return await this.Model.findOne();
    }

    async findById(id){
        var model = await this.Model.findByPk(id);
        return model;
    }

    async findAll(){
        var models = await this.Model.findAll();
        return models;
    }

    async findByField(field, value){
        var model = await this.Model.findOne({
            where:{
                [field]:value
            }
        });

        return model;
    }

    async findByFields(query){
        var model = await this.Model.findAll({
            where:query
        });

        return model;
    }


    async update(data, where){
        var model = await this.Model.update(data, {where:where});
        return model;
    }

    async delete(id){
        var model = await this.Model.destroy({where:{id:id}});
        return model;
    }

}