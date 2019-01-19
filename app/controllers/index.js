const controllerFolder = __dirname;
const fs = require('fs');

module.exports = async (app) => {
    for(let file of fs.readdirSync(controllerFolder)){
        if(file == 'index.js' || file == 'Controller.js')
            continue;

        try{
            app.use(require(`${controllerFolder}/${file}`));
        }catch(err){
            console.log(file,': ',err);
        }
    };
}