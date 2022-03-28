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
        let customer = await queries.getAccountBalByCustomerId(id);
        
        if(customer.length === 0){
            res.json()
        }
        else{
            let balance = customer[0].balance
            res.json({
                balance
            })
        }
    },

    getLoanById:async function(req, res){
        let id = req.query.id;
        let loan = await queries.getLoanById(id);
        res.json(
            loan
        )
    }
}
