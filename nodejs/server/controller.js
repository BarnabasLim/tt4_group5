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

    getCustomerById:async function(req, res){
        try{
            let id = req.body.customerid
            let pwd = req.body.password
            let customer = await queries.getCustomerById(id,pwd);
            res.json(
                customer
            );
        }catch(error){
            res.status(400);
        }
    },

    getAccountBalByCustomerId:async function(req, res){
        try{
            let id = req.query.id
            let customer = await queries.getAccountBalByCustomerId(id);
            res.json(
                customer
            );
        }catch(error){
            res.status(400);
        }
    }
}
