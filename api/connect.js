const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("pos_react_node_db", "banky", "123456", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    port: 4000
});

module.exports = sequelize;