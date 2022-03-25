import * as config from './firebase';

// New For Firebase 9
import { initializeApp } from 'firebase/app';
import { getFirestore,
    collection, doc,
    getDocs,
    addDoc,
    deleteDoc,
    onSnapshot,//Real Time listener
    query,where, 
    orderBy, serverTimestamp,
    getDoc,
    updateDoc

} from "firebase/firestore";//service name

const firebaseConfig=config.firebaseConfig()

// New For Firebase 9
//init firebase app
const app = initializeApp(firebaseConfig);
//init services
const db = getFirestore(app);

export const db_getbook = async (bookid,onSuccess , onError) => {

    try {
        const docRef=doc(db,'books',bookid)
        const book=await getDoc(docRef)
        onSuccess(book)
    } catch (e) {
        console.error("Error Reading document: ", e);
        onError(e)
    }

}

export const db_querybook = async (bookid,onSuccess , onError) => {

    try {
        const docRef=doc(db,'books',bookid)
        const unsubscribe=onSnapshot(docRef,
            (snapshot)=>{
                onSuccess(snapshot.data())
            }
        )
        return unsubscribe
    } catch (e) {
        console.error("Error Reading document: ", e);
        onError(e)
    }

}

/**
 * This function is trigger everytime the database Changes
 * @param {string} bookquery 
 * @param {string} queryType - ['exact', 'include'].
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns 
 */
 export const db_querybooks = async (bookquery,queryType,onSuccess , onError) => {

    try {
        if(bookquery==''){
            onSuccess([])
            return null
        }else{
            // collection ref
            const colRef=collection(db,'books')
            const q = queryType=='exact'
            ?
            query(colRef, where("title", "==", bookquery))
            :
            query(colRef, where('title', '>=', bookquery),where('title', '<=', bookquery+ '\uf8ff'),orderBy('title'),orderBy('createdAt'))

            
            const unsubscribe = onSnapshot(q,(snapshot)=>{
                let books=[]
                snapshot.docs.forEach((doc)=>{
                    books.push({...doc.data(), id: doc.id})
                })
                console.log("SnapShot!",books)
                onSuccess(books)
            })
            return unsubscribe;
        }


    } catch (e) {
        
        console.error("Error adding document: ", e);
        onError(e)
    }

}

/**
 * This function is trigger everytime the database Changes
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns 
 */
 export const db_onSnapShotbooks = async (onSuccess , onError) => {

    try {
        // collection ref
        const colRef=collection(db,'books')
        const unsubscribe =onSnapshot(colRef,(snapshot)=>{
            let books=[]
            snapshot.docs.forEach((doc)=>{
                books.push({...doc.data(), id: doc.id})
            })
            console.log("SnapShot!",books)
            onSuccess(books)
        })
        return unsubscribe;

    } catch (e) {
        
        console.error("Error adding document: ", e);
        onError(e)
    }

}

/**
 * This method deletes books from Firestore.
 * @param {Object} book 
 */
 export const db_deletebooks = async (book) => {

    try {
        // collection ref
        console.log(book)
        const docRef=doc(db,'books',book.id)
        await deleteDoc(docRef)
        console.log("deleted ",book.title);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

/**
 * This method add books from Firestore.
 * @param {object} book 
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_addbooks = async (book,onSuccess,onError) => {

    try {
        // collection ref
        const colRef=collection(db,'books')
        const docRef=await addDoc(colRef,{
            title:book.title,
            author:book.author,
            price:parseInt(book.price),
            createdAt: serverTimestamp()
        })


        console.log(book)
        onSuccess(book)
    } catch (e) {
        onError(e)
        console.error("Error adding document: ", e);
    }

}


/**
 * This method delete books from Firestore.
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_getbooks = async (onSuccess , onError) => {

    try {
        // collection ref
        const colRef=collection(db,'books')
        const docRef=await getDocs(colRef)

        let books=[]
        docRef.forEach((doc)=>{
            books.push({...doc.data(), id: doc.id})
        })

        console.log(books)
        onSuccess(books)
    } catch (e) {
        
        console.error("Error adding document: ", e);
        onError(e)
    }

}

