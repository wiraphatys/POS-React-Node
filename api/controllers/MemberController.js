const express = require("express");
const MemberModel = require("../models/MemberModel");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.post("/member/signin", async (req, res) => {
    try {
        const member = await MemberModel.findAll({
            where: {
                phone: req.body.phone,
                pass: req.body.pass
            }
        })
        if (member.length > 0) {
            let token = jwt.sign({id: member[0].id}, process.env.secret);
            res.send({token: token, message: "success"});
        } else {
            res.send({status: 401, message: "not found"});
        }
    } catch (e) {
        res.send({message: e.message})
    }
})

module.exports = app;