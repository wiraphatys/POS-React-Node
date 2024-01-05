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
        const productImage = req.files.productImage;
        const uploadPath = `${__dirname}/../uploads/${productImage.name}`;

        await productImage.mv(uploadPath, err => {
            if (err) {
                throw new Error(err);
            }
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