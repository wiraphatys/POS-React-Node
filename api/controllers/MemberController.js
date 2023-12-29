const express = require("express");
const MemberModel = require("../models/MemberModel");
const PackageModel = require("../models/PackageModel");
const app = express();
const jwt = require("jsonwebtoken");
const service = require("./Service");
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
            res.statusCode = 401;
            res.send({message: "not found"});
        }
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.get("/member/info", service.isLogin, async (req, res) => {
    try {
        MemberModel.belongsTo(PackageModel);
        const payload = jwt.decode(service.getToken(req));
        const member = await MemberModel.findByPk(payload.id, {
            attributes: ["id", "name"],
            include: [
                {
                    model: PackageModel,
                    attributes: ["name"]
                }
            ]
        });
        res.send({result: member, message: "success",});
    } catch (e) {
        res.statusCode = 500;
        return res.send({message: e.message});
    }
})

app.put("/member/changeProfile", service.isLogin, async (req, res) => {
    try {
        const payload = jwt.decode(service.getToken(req));
        const { memberName } = req.body;

        // Perform the update operation and use the 'returning' option to get the updated record
        const [updatedRowCount, updatedMembers] = await MemberModel.update(
            { name: memberName },
            {
                where: {
                    id: payload.id
                },
                returning: true, // This option allows Sequelize to return the updated record(s)
            }
        );

        if (updatedRowCount > 0) {
            const updatedMember = updatedMembers[0]; // If you're updating a single record, use the first element
            res.send({ message: 'success', updatedMember: updatedMember });
        } else {
            res.send({ message: 'No records updated.' });
        }
    } catch (e) {
        return res.send({ message: e.message });
    }
});




module.exports = app;