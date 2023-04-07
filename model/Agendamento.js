const db = require('./banco');

const Agendamentos = db.sequelize.define("agendamentos", {
    name: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.INTEGER
    },
    date: {
        type: db.Sequelize.DATE
    },
    phone: {
        type: db.Sequelize.INTEGER
    },
    observation: {
        type: db.Sequelize.TEXT
    }
})

// Agendamentos.sync({ force: true })


module.exports = Agendamentos;