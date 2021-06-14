const Sequelize = require('sequelize');

const sequelize = new Sequelize('uptasknode', 'root', 'root', {

    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    //operatorsAliases: 1 = true. Boolean ar deprecated. Use '0' or '1' for true or false respectively
    operatorsAliases: 1,
    define: {
        timestamps: false
    },
    pool:{
        max:5,
        min:0,
        acquite: 30000,
        idle:10000
    }

});

module.exports = sequelize;