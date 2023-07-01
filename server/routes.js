const { Router } = require('express');
const agendamento = require("../model/Agendamento");
const dbfirestore = require("../model/banco");
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const agendamentoRoutes = Router();
agendamentoRoutes.get("/", (req, res) => {
    res.render("create")
});

agendamentoRoutes.post("/register", async (req, res) => {
    try {
        const respon = await dbfirestore.dbfirestore.collection('agendamentos').add({
            name: req.body.name,
            address: req.body.address,
            cep: req.body.cep,
            date: req.body.date,
            phone: req.body.phone,
            observation: req.body.observation
        });
        res.redirect("/list-clients");
    } catch (error) {
        res.send("Falha ao cadastrar: " + error);
    }
});

agendamentoRoutes.get("/list-clients", async (req, res) => {
    var agendamentos = [];
    try {
        const snapshot = await dbfirestore.dbfirestore.collection('agendamentos').get();
        snapshot.forEach((doc) => {
            agendamentos.push(
                {
                    data: doc.data(),
                    id: doc.id
                }
            );
        });
        res.render("list-page", { agendamentos });
    } catch (error) {
        console.log(error);
    }
});

agendamentoRoutes.get("/edit/:id", async (req, res) => {
    try {
        const docRef = dbfirestore.dbfirestore.collection('agendamentos').doc(req.params.id);
        const data = await docRef.get();
        const agendamento = [{
            data: data.data(),
            id: data.id
        }]
        res.render("update-page", { agendamento });
    } catch (error) {
        console.log(error);
    }
})

agendamentoRoutes.post("/update", async (req, res) => {
    try {
        const docRef = dbfirestore.dbfirestore.collection('agendamentos').doc(req.body.id);
        const respo = await docRef.update({
            name: req.body.name,
            address: req.body.address,
            cep: req.body.cep,
            date: req.body.date,
            phone: req.body.phone,
            observation: req.body.observation
        });
        res.redirect("/list-clients");
    } catch (error) {
        console.log(error);
    }
})

agendamentoRoutes.get("/delete/:id", async (req, res) => {
    try {
        const respon = await dbfirestore.dbfirestore.collection('agendamentos').doc(req.params.id).delete();
        res.redirect("/list-clients");
    } catch (error) {
        console.log(error)
    }
})


//DESAFIO
/*
Crie uma página web contendo um formulário com os seguintes campos: produto, marca, modelo, descrição e palavras-chaves, ao usuário preencher as informações referente ao produto, marca e modelo gere a sua respectiva descrição e 100 palavras-chaves utilizando a API OPENAI.

*/
agendamentoRoutes.get("/talk-with-friend", (req, res) => {
    res.render("chat-page");
})

agendamentoRoutes.post("/talk-with-chat", async (req, res) => {
    const { model, marca, product } = req.body;

    let result = {};
    const req_description = `Gere uma descrição de produto ${product} de modelo ${model} e da marca ${marca}`;
    const req_keywords = `Gere 100 palavras chaves para o produto ${product} de modelo ${model} e da marca ${marca}`;

    try {
        const response_description = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req_description }],
        });

        const response_keywords = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req_keywords }],
        });

        result = {
            req_message: `Descrição e palavras chaves para o produto ${product} de modelo ${model} e da marca ${marca}`,
            response_keywords: response_keywords.data.choices[0].message.content,
            response_description: response_description.data.choices[0].message.content
        };
    } catch (error) {
        console.log(error);
    }

    res.render("challenge-page", result);

})

module.exports = {
    agendamentoRoutes
};