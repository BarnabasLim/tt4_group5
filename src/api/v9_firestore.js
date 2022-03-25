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
    updateDoc,
    setDoc,

} from "firebase/firestore";//service name

const firebaseConfig=config.firebaseConfig()

// New For Firebase 9
//init firebase app
const app = initializeApp(firebaseConfig);
//init services
const db = getFirestore(app);

/**
 * This method add Cutomers from Firestore.
 * @param {object} cutomer
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_addPaymenttoLoans = async (PaymenttoLoans,onSuccess,onError) => {

    try {
        // collection ref

        // PaymentId: 1,
        // LoanId: 1,
        // payment_date: "2022-02-20",
        // payment_amount: 35532.99

        //const colRef=collection(db,'customers')
        const docRef=doc(db, "loanTest/"+PaymenttoLoans.LoanId+"/PaymentTest/"+PaymenttoLoans.PaymentId)
        await setDoc(docRef,{
            PaymentId: PaymenttoLoans.PaymentId,
            LoanId: PaymenttoLoans.LoanId,
            payment_date: PaymenttoLoans.payment_date,
            payment_amount: PaymenttoLoans.payment_amount,
        })


        // console.log(customer)
        // onSuccess(customer)
        onSuccess()
    } catch (e) {
        onError(e)
        console.error("Error adding document: ", e);
    }

}


/**
 * This method add Cutomers from Firestore.
 * @param {object} cutomer
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_addLoanToCutomers = async (LoantoCustomer,onSuccess,onError) => {

    try {
        // collection ref

        // CustomerLoanId: 1,
        // CustomerId: 7,
        // LoanId: 6
        //const colRef=collection(db,'customers')
        const docRef=doc(db, "customersTest/"+LoantoCustomer.CustomerId+"/loanTest/"+LoantoCustomer.LoanId)
        await setDoc(docRef,{
            LoanId:LoantoCustomer.LoanId,
        })


        // console.log(customer)
        // onSuccess(customer)
        onSuccess()
    } catch (e) {
        onError(e)
        console.error("Error adding document: ", e);
    }

}

/**
 * This method add Cutomers from Firestore.
 * @param {object} cutomer
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_addCutomers = async (customer,onSuccess,onError) => {

    try {
        // collection ref
        const docRef=doc(db,'customersTest/'+customer.CustomerId)
        await setDoc(docRef,{
            CustomerId: customer.CustomerId,
            customer_name: customer.customer_name,
            customer_phone: customer.customer_phone,
            customer_address: customer.customer_address,
            balance: 69687.54,
            password: "password",
        })


        console.log(customer)
        onSuccess(customer)
    } catch (e) {
        onError(e)
        console.error("Error adding document: ", e);
    }

}

/**
 * This method add Cutomers from Firestore.
 * @param {object} Loan
 * @param {function} onSuccess 
 * @param {function} onError 
 */
 export const db_addLoans = async (Loan,onSuccess,onError) => {

    try {
        // collection ref
        const docRef=doc(db,'loanTest/'+Loan.LoanId)
        await setDoc(docRef,{

            LoanId: Loan.LoanId,
            loan_amount: Loan.loan_amount

        })


        console.log(Loan)
        onSuccess(Loan)
    } catch (e) {
        onError(e)
        console.error("Error adding document: ", e);
    }

}

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

