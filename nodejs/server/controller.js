const { all } = require('./api-routes');
let db = require("../database/config.js");
var firestore = require('firebase/firestore/lite');

module.exports = {
    getAll:async function(req, res){
        const booksCol = firestore.collection(db, 'books');
        const booksSnapshot = await firestore.getDocs(booksCol);
        const booksList = booksSnapshot.docs.map(doc => doc.data());
        res.json({
            booksList
        });
        // return booksList;
    }
}