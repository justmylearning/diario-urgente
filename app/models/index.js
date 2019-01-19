const modelFolder = __dirname;
const fs = require('fs');

module.exports = async () => {
    for(let file of fs.readdirSync(modelFolder)){
        if(file == 'index.js' || file == 'Model.js')
            continue;

        console.log('\nSynchronizing Model: ' + file);
        var model = require(`${modelFolder}/${file}`);
        try{

            await model.sync({force:true});
        }catch(err){
            console.log(file,': ',err);
        }
    };
}