const app = require('../app');
const argValidation = require('../util/ArgValidation');

const onError = (error) =>{
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(' Usuário sem permissão pra executar o serviço. ');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(' Porta já está em uso ');
      process.exit(1);
      break;
    default:
      console.log('Dentro do Defautl do OnError com erro não tratado. ');
      throw error;
  }
}

argValidation.configFile( (config) =>{
  const server = app.listen(config.door, () => {
      console.log('Servidor Backend rodando na porta ' + config.door );
    }); 
    server.on('error', onError);
})