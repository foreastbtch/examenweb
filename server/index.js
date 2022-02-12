"use strict";

const express = require("express");
const sequelize = require("./sequelize");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT;
require("./models/founder");
require("./models/company");

const Company = require("./models/company");
const Founder = require("./models/founder");

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

Company.hasMany(Founder);

app.use("/api", require("./routes/companies"));
app.use("/api", require("./routes/founders"));

app.listen(port, async() => {
    console.log(`Server started on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully!");
    } catch (err) {
        console.error("Unable to connect to the database: ", err);
    }
});