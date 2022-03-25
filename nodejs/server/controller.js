const { all } = require('./api-routes');
let db = require("../database/config.js");
let queries = require("../database/queries.js");
var firestore = require('firebase/firestore/lite');

module.exports = {
    getAllCustomers:async function(req, res){
        let customers = await queries.getAllCustomers();
        res.json({
            customers
        });
    },

    checkLogin:async function(req, res){
        let customerName = req.body.customerName;
        let pwd = req.body.password;
        let customer = await queries.checkLogin(customerName,pwd);
        res.json(
            customer
        )
    },

    getAccountBalByCustomerId:async function(req, res){
        let id = req.query.id;
        console.log(id);
        let customer = await queries.getAccountBalByCustomerId(id);
        res.json(
            customer
        )
    }
}
