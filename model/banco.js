const Sequelize = require("sequelize");

const sequelize = new Sequelize("agendamento_crud", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}