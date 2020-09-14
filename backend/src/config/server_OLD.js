const port = 3000

//use mysql database
const mysql = require('mysql');
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
var cors = require('cors')

server.options('/Usuario/Insert', cors())
server.options('*', cors())
server.use(cors())

const db = require("../models");
//db.sequelize.sync();

//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

server.listen(port, function () {
  console.log(`Servidor de API rodando na porta: ${port}.`)
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql@309389',
  database: 'crud_db'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySql dentro do SERVER_OLD.js');
});

// simple route
server.get("/", (req, res) => {
  res.json({ message: "APP de exemplo, usando Node, Express, MySql e Sequelize." });
});

server.get('/Usuario/List', (req, res) => { //get method
  //VERIFICAR COMO FICA A AUTORIZAÇÃO
  res.setHeader('Access-Control-Allow-Origin', '*');

  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.end(JSON.stringify(results));

  });
})

server.post('/auth', function (request, response) {
  var email = "'" + request.body.email + "'";
  var password = "'" + request.body.password + "'";
  var sql = 'SELECT * FROM user WHERE  user_email = ' + email + ' AND user_password = ' + password;

  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results[0].user_first_name);
    if (results.length > 0) {
      response.send(results[0].user_first_name);
    } else {
      response.send("");
    }
    response.end();
  });
});

server.post('/Usuario/Insert', (req, res) => {

  let data = {
    user_first_name: req.body.name
    , user_last_name: req.body.lastName
    , user_email: req.body.email
    , user_password: req.body.password
  };

  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send("Usuário inserido com sucesso!")
  });
});

server.post('/update', (req, res) => {

  let sql = "UPDATE product SET product_name='" + req.body.product_name
    + "', product_purchase_price='" + req.body.product_purchase_price
    + "', product_sale_price= '" + req.body.product_sale_price
    + "', product_unit_of_measurement= '" + req.body.product_unit_of_measurement
    + "', product_stock= '" + req.body.product_stock
    + "', product_category= '" + req.body.product_category
    + "' WHERE product_id=" + req.body.product_id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

server.post('/delete', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = server












