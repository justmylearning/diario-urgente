const Sequelize = require('sequelize');
const databaseConfig = require('../../config/database.json');

module.exports = class DatabaseService{
    static connection = null;

    static getConnection(){
        if(DatabaseService.connection)
            return DatabaseService.connection;
        
        const sequelize = new Sequelize(`mysql://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`);
        sequelize.authenticate().then(() => {
            DatabaseService.connection = sequelize;
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            throw "Database Connection Error!";
        });

        return sequelize;
    }
}