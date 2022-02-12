const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Founder = sequelize.define(
    "Founder", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nume: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING
        }
    }, { tableName: "Founders" }
)

module.exports = Founder;