const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
// force: true
sequelize.sync({}).then(() => {
    console.log("All models were synchronized successfully!");
})

module.exports = sequelize;