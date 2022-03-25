let db = require("./config.js");
var firestore = require('firebase/firestore/lite');


module.exports = {
    getAllCustomers:async function(){
        const customersCol = firestore.collection(db, 'customersTest');
        const customersSnapshot = await firestore.getDocs(customersCol);
        const customersList = customersSnapshot.docs.map(doc => doc.data());
        return customersList;
    },
    checkLogin:async function(customerName,pwd){
        const customerCol = firestore.collection(db, 'customersTest');
        const q = firestore.query(customerCol, firestore.where("customer_name","==",customerName),firestore.where("password","==",pwd));
        const customerSnapshot = await firestore.getDocs(q);
        const customerList = customerSnapshot.docs.map(doc => doc.data());
        return customerList;
    },
    getAccountBalByCustomerId:async function(id){
        const customerCol = firestore.collection(db, 'customersTest');
        const q = firestore.query(customerCol, firestore.where("CustomerId","==",id));
        const customerSnapshot = await firestore.getDocs(q);
        // const customerList = customerSnapshot.docs.map(doc => doc.data());
        console.log(customerSnapshot.docs);
        return customerSnapshot.docs;
    }
}
