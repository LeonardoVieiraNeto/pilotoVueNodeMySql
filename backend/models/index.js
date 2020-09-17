"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const cls = require('cls-hooked')
var DataTypes = require('sequelize/lib/data-types');

let sequelize;

const namespace = cls.createNamespace('ErpMatrixNamespace');

Sequelize.useCLS(namespace);

var env = process.env.NODE_ENV || 'production';
var config = require('../config/database.js')[env];
var database = process.env.DATABASE || 'ispcloud_starnet';
var url = process.env.URL || '';
var db = {};

sequelize = new Sequelize(database, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
  port: config.port
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (!file.includes("Definition"));
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  //if (db[modelName].associate) {
  //  db[modelName].associate(db);
  //}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db
