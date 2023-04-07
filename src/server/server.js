const express = require("express");
const expsHandle = require("express-handlebars");
const bodyParser = require("body-parser");
const agendamento = require("../../model/Agendamento");

const app = express();

app.engine('hbs', expsHandle.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("create")
});

app.post("/register", (req, res) => {
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

app.get("/list-clients", (req, res) => {

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


app.listen(8081, () => {
    console.log("Server running at port 8081");
})