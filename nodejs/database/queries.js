let db = require("./config.js");
var firestore = require('firebase/firestore/lite');


module.exports = {
    getAllCustomers:async function(){
        const customersCol = firestore.collection(db, 'customersTest');
        const customersSnapshot = await firestore.getDocs(customersCol);
        const customersList = customersSnapshot.docs.map(doc => doc.data());
        return customersList;
    },
    getCustomerById:async function(id,pwd){
        const customerCol = firestore.collection(db, 'customersTest');
        const q = firestore.query(customerCol, firestore.where("customerid","==",id),where("password","==",pwd));
        const customerSnapshot = await firestore.getDocs(q);
        const customerList = customerSnapshot.docs.map(doc => doc.data());
        return customerList;
    }
    // ,
    // getAccountBalByCustomerId:async function(id){
    //     const customerCol = firestore.collection(db, 'customers');
    //     const q = firestore.query(customerCol, firestore.where("customerid","==",id));
    //     const customerSnapshot = await firestore.getDocs(q);
    //     // const customerList = customerSnapshot.docs.map(doc => doc.data());
    //     console.log(doc.data());
    //     return doc.data();
    // }
}
