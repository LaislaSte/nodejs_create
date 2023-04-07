const express = require("express");
const expsHandle = require("express-handlebars");
const bodyParser = require("body-parser");
const { createRoute, register, list } = require("./routes");

const app = express();

app.engine('hbs', expsHandle.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(createRoute, register, list);

app.listen(8081, () => {
    console.log("Server running at port 8081");
})