const { Router } = require('express');
const agendamento = require("../model/Agendamento");

const createRoute = Router();

createRoute.get("/", (req, res) => {
    res.render("create")
});

const register = Router().post("/register", (req, res) => {
    agendamento.create({
        name: req.body.name,
        address: req.body.address,
        cep: req.body.cep,
        date: req.body.date,
        phone: req.body.phone,
        observation: req.body.observation
    }).then(() => {
        res.redirect("/list-clients");
    }).catch((erro) => {
        res.send("Falha ao cadastrar: " + erro);
    });
});

const list = Router().get("/list-clients", (req, res) => {

    agendamento.findAll()
        .then((agendamentos) => {
            // console.log(agendamentos)
            res.render("list-page",
                {
                    agendamentos: agendamentos
                }
            );
        })
        .catch((error) => {
            res.render("Ocorreu um erro " + error);
        })
});



module.exports = {
    createRoute,
    register,
    list
};