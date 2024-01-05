const express = require("express");
const app = express();
const ProductImageModel = require("../models/ProductImageModel");
const service = require("./Service");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.get("/productImage/list/:productId", service.isLogin, async (req, res) => {

})

app.post("/productImage/insert", service.isLogin, async (req, res) => {
    try {
        const myDate = new Date();
        const y = myDate.getFullYear();
        const m = myDate.getMonth() + 1;
        const d = myDate.getDate();
        const h = myDate.getHours();
        const mn = myDate.getMinutes();
        const s = myDate.getSeconds();
        const ms = myDate.getMilliseconds();

        const productImage = req.files.productImage;
        const newName = `${y}-${m}-${d}-${h}-${mn}-${s}-${ms}`;
        const arr = productImage.name.split('.');
        const ext = arr[arr.length-1];
        const fullNewName = `${newName}.${ext}`;
        const uploadPath = `${__dirname}/../uploads/${fullNewName}`;

        await productImage.mv(uploadPath, async err => {
            if (err) {
                throw new Error(err);
            }
            await ProductImageModel.create({
                productId: req.body.productId,
                imageName: fullNewName,
                isMain: false,
            })

            res.send({message: "success"});
        })
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.delete("/productImage/delete/:id", service.isLogin, async (req, res) => {

})

module.exports = app;