const app = require('../app');
const models = require('../models');
const argValidation = require('../util/ArgValidation.js');
const sendEmail = require('../util/SendEmail');

const onError = (error) => {
    if(error.sycall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe' + port 
    : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'precisa de privilégios maiores ');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' está sendo usada ');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

argValidation.configFile((config) => {
    models.sequelize.sync().then (() => {

        const server = app.listen(config.door, () => {
            console.log('Servidor rodando na porta: ' + config.door);
        });

        server.on('error', onError);

    })

})
