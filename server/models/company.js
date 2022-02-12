const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Company = sequelize.define(
    "Company", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nume: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.DATE
        }
    }, { tableName: "Companies" }
)

module.exports = Company;