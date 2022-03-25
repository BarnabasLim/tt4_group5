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
        const q = firestore.query(customerCol, firestore.where("CustomerId","==",Number(id)));
        const customerSnapshot = await firestore.getDocs(q);
        const customerList = customerSnapshot.docs.map(doc => doc.data());
        return customerList;
    },
    getLoanById:async function(id){
        // const docRef = firestore.doc(db, "loanTest", id);
        const loanCol = firestore.collection(db, 'loanTest');
        const q = firestore.query(loanCol, firestore.where("LoanId","==",Number(id)));
        // const loanSnapshot = await firestore.getDocs(docRef);
        const loanSnapshot = await firestore.getDocs(q);
        const loanList = loanSnapshot.docs.map(doc => doc.data());
        return loanList;
    }
}
