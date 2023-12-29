const connect = require("../connect");
const { DataTypes } = require("sequelize");

const ProductModel = connect.define("product", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    barcode: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    cost: {
        type: DataTypes.BIGINT
    },
    price: {
        type: DataTypes.BIGINT
    },
    detail: {
        type: DataTypes.STRING
    }
});

ProductModel.sync({alter: true});

module.exports = ProductModel;