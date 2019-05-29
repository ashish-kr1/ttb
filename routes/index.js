const controller = require('../controller/controller');

module.exports=(app)=>{
    app.post('/send/:n',controller.findText);
}