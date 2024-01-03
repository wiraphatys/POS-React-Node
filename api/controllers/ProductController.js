const express = require("express");
const app = express();
const ProductModel = require("../models/ProductModel");
const service = require("./Service");

app.post("/product/insert", service.isLogin, async (req, res) => {
    try {
        const result = await ProductModel.create(req.body);
        res.send({result: result, message: "success"});
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.get("/product/list", service.isLogin, async (req, res) => {
    try {
        const result = await ProductModel.findAll({
            order: [["id", "ASC"]]
        })
        res.send({result: result, message: "success"});
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.delete("/product/delete/:id", service.isLogin, async (req, res) => {
    try {
        const result = await ProductModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({message: "success", result: result});
    } catch(e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;