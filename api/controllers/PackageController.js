const express = require("express");
const app = express();
const PackageModel = require("../models/PackageModel");

app.get("/packages/list", async (req, res) => {
    try {
        const result = await PackageModel.findAll({
            order: ["price"]
        });
        res.send({result: result});
    } catch (e) {
        res.statusCode(500).send({message: e.message});
    }
})

module.exports = app;