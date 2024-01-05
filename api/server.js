const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(require("./controllers/PackageController"));
app.use(require("./controllers/MemberController"));
app.use(require("./controllers/ProductController"));
app.use(require("./controllers/ProductImageController"));

app.listen(port, () => {
    console.log(`this server is running on port ${port}`);
})