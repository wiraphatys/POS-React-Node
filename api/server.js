const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const PackageController = require("./controllers/PackageController");
const MemberController = require("./controllers/MemberController");

app.use(PackageController);
app.use(MemberController);

app.listen(port, () => {
    console.log(`this server is running on port ${port}`);
})