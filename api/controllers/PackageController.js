const express = require("express");
const app = express();
const PackageModel = require("../models/PackageModel");
const MemberModel = require("../models/MemberModel");

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

app.post("/package/memberRegister", async(req, res) => {
    try {
        const result = await MemberModel.create({
            packageId: req.body.packageId,
            name: req.body.name,
            phone: req.body.phone
        });
        res.send({message: "success", result: result});
    } catch(e) {
        res.statusCode(500).send({message: e.message});
    }
})

module.exports = app;