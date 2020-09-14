const mysql = require('mysql');

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "crud_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql@309389',
    database: 'crud_db'
  });

