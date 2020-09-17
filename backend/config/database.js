const Sequelize = require("sequelize");

module.exports = {
    development: {
        "host": "localhost",
        "port": 3306,
        "database": "ispcloud_starnet",
        "user": "root",
        "password": "mysql@309389",
        "dialect": "mysql",
        "logging": false,
        "operatorsAliases": Sequelize.Op,
        "pool": {
            "max": 15,
            "min": 5,
            "idle": 10000
        }
    },
};