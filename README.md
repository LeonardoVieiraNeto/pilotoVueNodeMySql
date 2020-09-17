Pacotes instalados que iremos usar no projeto

morgan 
npm i express-validator@5.2.0 — A última versão do express-validator não funcionou, instalei essa, que o Willi nos outros projetos. 
npm install cross-env
npm install md5
npm install js-md5
npm i cls-hooked
nodemailer

O serviço inicia sua execução pelo app.js e bin/index.js, as configurações(banco, portas, serviços externos) ficam no arquivo da pasta config

Temos a estrutura de camadas: 

    ** Backend 
         ** REST - Ficam os verbos HTTP(PUT, GET, POST, DELETE, etc…)
              -- XXX1Rest
  	          -- XXX2Rest
              -- XXX3Rest
         ** Service - Ficam as regras de negócio e acesso a banco ou outros serviços externos, pensei em uma divisão de pastas aqui dentro, usei como base a estrutura 			atual do ISPCloud, a REST chama essa camada
              -- XXX1Service
              -- XXX2Service
              -- XXX3Service
         ** Models - Modelos de banco de dados, usando a sintaxe so Sequelize-ORM
              -- XXX1
  	          -- XXX2
              -- XXX3    
 
Fiz o CRUD de usuários e o login, já usando a tabela CNF_USUARIO e as camadas(REST, SERVICE e Model), será útil para o desenvolvimento dos outros CRUD’s

Criei a pasta util, usando as classes e métodos usados atualmente nos outros sistemas da matrix. 

