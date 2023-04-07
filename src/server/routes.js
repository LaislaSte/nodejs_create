const { Router } = require('express');
const agendamentos = require("../model/agendamentos");

const createRoute = Router();

createRoute.get('/', (req, res, next) => {

    agendamentos.create({

    })
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop'
    });
});

module.exports = router;