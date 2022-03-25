import logo from './logo.svg';
import './App.css';
// import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTasks from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import TaskDetails from './components/TaskDetails';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import Navbar from './components/Navbar2/components/Navbar';
//import Navbar from './components/Navbar';
import Services from './screens/ServicesScreen/Services';
import Products from './screens/ProductsScreen/Products';
import LoanPayment from './screens/ContactUsScreen/LoansPayment';
import SignUp from './screens/SignUpScreen/SignUp';
import Marketing from './screens/MarketingScreen/Marketing';
import Consulting from './screens/ConsultingScreen/Consulting';
import Random from './screens/RandomScreen/Random';

//for data import
import * as Data from './api/data';
import * as localData from './api/localHostData';
import * as v9_firestore from './api/v9_firestore';
import * as v9_auth from './api/v9_auth';

//Modal
import  Modal  from './AppComponents/Modal';
function App() {

  //Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev);
  };

  // const [tasks, setTasks]=useState([])
  // const [showAddTask, setShowAddTask]=useState(false)

  // //Extract Data
  // const [data, setData]=useState({hits:[]})
  // const [query, setQuery]=useState('redux')
  

  // //Extract Data
  // const [bookResults, setBookResults]=useState([])
  // const [bookQuery, setBookQuery]=useState('Les')
  // const [bookQueryType, setBookQueryType]=useState('include')

  // const [bookTitle, setBookTitle]=useState("The Midnight Sun");
  // const [bookAuthor, setBookAuthor]=useState("James")
  // const [bookPrice, setBookPrice]=useState(5);

  // const [books, setBooks]=useState([])
  let cutomer=[
    {
      CustomerId: 1,
      customer_name: "Farrah Dobbie",
      customer_phone: "3688961901",
      customer_address: "49862 Kingsford Junction",
      balance: 69687.54
    },
    {
      CustomerId: 2,
      customer_name: "Malcolm Orbell",
      customer_phone: "8867727382",
      customer_address: "385 Lawn Terrace",
      balance: 55592.51
    },
    {
      CustomerId: 3,
      customer_name: "Filippa Bucknill",
      customer_phone: "6677805329",
      customer_address: "1898 Michigan Road",
      balance: 53826.01
    },
    {
      CustomerId: 4,
      customer_name: "Dido Vanezis",
      customer_phone: "2887691797",
      customer_address: "57689 Myrtle Park",
      balance: 30581.83
    },
    {
      CustomerId: 5,
      customer_name: "Annelise Aspland",
      customer_phone: "2096293966",
      customer_address: "3922 Cherokee Place",
      balance: 87026.91
    },
    {
      CustomerId: 6,
      customer_name: "Herminia Newby",
      customer_phone: "8111478402",
      customer_address: "19 Chive Center",
      balance: 5414.47
    },
    {
      CustomerId: 7,
      customer_name: "Lind Hanley",
      customer_phone: "7504959822",
      customer_address: "7534 Village Green Center",
      balance: 25921.26
    },
    {
      CustomerId: 8,
      customer_name: "Mimi Gilhooley",
      customer_phone: "6594140488",
      customer_address: "16033 Pond Avenue",
      balance: 62834.94
    },
    {
      CustomerId: 9,
      customer_name: "Ileana Parkes",
      customer_phone: "1281389203",
      customer_address: "095 Warner Hill",
      balance: 76939.31
    },
    {
      CustomerId: 10,
      customer_name: "Larissa Yeldham",
      customer_phone: "2812360584",
      customer_address: "220 Shopko Parkway",
      balance: 15790.59
    }
  ]


  let Curtomer_loans=[
    {
      CustomerLoanId: 1,
      CustomerId: 7,
      LoanId: 6
    },
    {
      CustomerLoanId: 2,
      CustomerId: 8,
      LoanId: 8
    },
    {
      CustomerLoanId: 3,
      CustomerId: 8,
      LoanId: 7
    },
    {
      CustomerLoanId: 4,
      CustomerId: 8,
      LoanId: 1
    },
    {
      CustomerLoanId: 5,
      CustomerId: 8,
      LoanId: 10
    },
    {
      CustomerLoanId: 6,
      CustomerId: 7,
      LoanId: 9
    },
    {
      CustomerLoanId: 7,
      CustomerId: 5,
      LoanId: 3
    },
    {
      CustomerLoanId: 8,
      CustomerId: 2,
      LoanId: 2
    },
    {
      CustomerLoanId: 9,
      CustomerId: 4,
      LoanId: 4
    },
    {
      CustomerLoanId: 10,
      CustomerId: 4,
      LoanId: 5
    }
  ]

  let loans=[
    {
      LoanId: 1,
      loan_amount: 135532.99
    },
    {
      LoanId: 2,
      loan_amount: 34367.53
    },
    {
      LoanId: 3,
      loan_amount: 45086.74
    },
    {
      LoanId: 4,
      loan_amount: 140123.37
    },
    {
      LoanId: 5,
      loan_amount: 57800.21
    },
    {
      LoanId: 6,
      loan_amount: 13165.14
    },
    {
      LoanId: 7,
      loan_amount: 82062.24
    },
    {
      LoanId: 8,
      loan_amount: 12416.32
    },
    {
      LoanId: 9,
      loan_amount: 17250.83
    },
    {
      LoanId: 10,
      loan_amount: 46431.85
    }
  ]

  let loan_payment=[
    {
      PaymentId: 1,
      LoanId: 1,
      payment_date: "2022-02-20",
      payment_amount: 35532.99
    },
    {
      PaymentId: 2,
      LoanId: 6,
      payment_date: "2022-03-19",
      payment_amount: 7818.63
    },
    {
      PaymentId: 3,
      LoanId: 4,
      payment_date: "2022-01-12",
      payment_amount: 74562.54
    },
    {
      PaymentId: 4,
      LoanId: 4,
      payment_date: "2022-03-21",
      payment_amount: 51364.06
    },
    {
      PaymentId: 5,
      LoanId: 3,
      payment_date: "2022-01-17",
      payment_amount: 16363.67
    },
    {
      PaymentId: 6,
      LoanId: 1,
      payment_date: "2022-01-03",
      payment_amount: 26544.58
    },
    {
      PaymentId: 7,
      LoanId: 1,
      payment_date: "2022-02-27",
      payment_amount: 30534.71
    },
    {
      PaymentId: 8,
      LoanId: 9,
      payment_date: "2022-02-27",
      payment_amount: 17250.83
    },
    {
      PaymentId: 9,
      LoanId: 2,
      payment_date: "2022-02-19",
      payment_amount: 34367.53
    },
    {
      PaymentId: 10,
      LoanId: 7,
      payment_date: "2022-02-08",
      payment_amount: 31003.82
    }
  ]
  
  //Sign up
  //Extract Data
  const [email, setEmail]=useState('barn@outlook.com')
  const [password, setPassword]=useState('')
  const [name, setName]=useState('John Doe')
  const [signUpError, setSignUpError]=useState({
    email:'Input Email',
    password:'Input Password',
    name:'Input Name'
  })
  const [signedIn, setSignedIn]=useState(false)
  const [user, setUser]=useState({});
  //Upon Mounting
  useEffect(()=>{

    v9_auth.setOnAuthStateChanged(
      (user)=>{
        setSignedIn(true)
        setUser(user)
      },
      (e)=>{setSignedIn(false)
        console.log(e)}
    )
    // v9_firestore.db_getbooks(
    //   (books)=>{setBooks(books)},
    //   (e)=>{console.log(e)}
    // );
    // // v9_firestore.db_addbooks({title:'2', author:'M', price:7},
    // //   (item)=>console.log(item),
    // //   (err)=>console.log(err)
    // // )
    // const unSubscribe_SnapShotbooks= v9_firestore.db_onSnapShotbooks(setBooks,
    //   ()=>{}
    // )
    // const abordCont=new AbortController();
    // localData.db_local_task_promise_fetch(setTasks, (err)=>{console.log(err)},abordCont)
    return ()=> {
      console.log("Safely Aborted")
      // abordCont.abort();
      // if (typeof  unSubscribe_SnapShotbooks === 'function') {
      //   unSubscribe_SnapShotbooks()
      // }
    }
  },[]);

  // const addBook=(title, author, price)=>{
  //       v9_firestore.db_addbooks({title:title, author:author, price:price},
  //         (item)=>console.log(item),
  //         (err)=>console.log(err)
  //       )
  //       setBookTitle('');
  //       setBookAuthor('');
  //       setBookPrice(0);
  // }



  // //When query Changes
  // useEffect(()=>{
  //   Data.db_algolia_promise_fetch(query, setData, (err)=>{console.log(err)})
  // },[query]);

  // useEffect(()=>{
  //   const unSubscribe_Querybooks=v9_firestore.db_querybooks(bookQuery,bookQueryType,setBookResults,(e)=>{console.log(e)})
  //   return ()=> {
  //     console.log("Safely Aborted")
  //     //unSubscribe_Querybooks()
  //     console.log("unSubscribe_Querybooks", typeof unSubscribe_Querybooks, unSubscribe_Querybooks)
  //     if (unSubscribe_Querybooks=== 'function') {
  //       unSubscribe_Querybooks()
  //     }
  //   }
  
  // },[bookQuery]);

  // const deleteBook=(book)=>{
  //    v9_firestore.db_deletebooks(books[books.length-1]);
  // };

  // const addTask=(task)=>{
  //   let tempTask=tasks.sort((b,a)=>b.id-a.id)
  //   let new_Task={...task,id:parseInt(tempTask[tempTask.length-1].id)+1};
  //   console.log(new_Task)
  //   localData.db_local_task_async_add(new_Task)
  //   setTasks((prev)=>{
  //     return [...prev, {...new_Task}]
  //   });
  // }


  //Sign up Verify
  const VerifyEmail=(email)=>{
        let formIsValid=true
        setSignUpError((prev)=>{
          const state = { ...prev };
          delete state["email"];
          //Email
          if (!email) {
            formIsValid = false;
            state["email"]="Email cannot be empty" 
          }else if (typeof email!== "undefined") {
            let lastAtPos = email.lastIndexOf("@");
            let lastDotPos = email.lastIndexOf(".");
      
            if (
              !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                email.indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                email.length - lastDotPos > 2
              )
            ) {
              formIsValid = false;
              state["email"]="Email is not valid"
            }
          }
          return state;
        })

        return formIsValid
  }

  const VerifyPassword=(password)=>{
    let formIsValid=true
    setSignUpError((prev)=>{
      const state = { ...prev };
      delete state["password"];
      //Email
      if (!password) {
        formIsValid = false;
        state["password"]="Password cannot be empty" 
      }else if (typeof password!== "undefined") {
        if(password.length<6){
          formIsValid = false;
          state["password"]="Password must be >6 chars"
        }
      }
      return state;
    })

    return formIsValid
}

const VerifyName=(name)=>{
  let formIsValid=true
  setSignUpError((prev)=>{
    const state = { ...prev };
    delete state["name"];
    //Email
    if (!name) {
      formIsValid = false;
      state["name"] = "Name cannot be empty";
    }else if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        state["name"] = "Only letters";
      }
    }

    return state;
  })

  return formIsValid
}

const CreateAccount=(name, email,password)=>{
  if(VerifyName(name)&&VerifyEmail(email)&&VerifyPassword(password)){
    let account={
      name:name,
      email:email,
      password:password
    }
    v9_auth.createAccount(account,
      (user)=>{
       console.log(user)
      },
      (e)=>{
        console.log(e)
      }
    )
  }
  
}

const SignInAccount=(email,password)=>{
  if(VerifyEmail(email)&&VerifyPassword(password)){
    let account={
      email:email,
      password:password
    }
    v9_auth.signInUser(account,
      (user)=>{
       console.log("signIn",user)
      },
      (e)=>{
        console.log(e)
      }
    )
  }
  
}

  const nameFun='Brad'
  return (
    <Router>
      <div className="Container">
        {/* <Header 
          title={nameFun} 
          showAddTask={showAddTask} 
          openForm={()=>{
            setShowAddTask(!showAddTask)
            addBook()
          }}
          setShowModal={()=>{
            console.log("clicked")
            openModal()}}
        /> */}
        
        <Modal showModal={showModal} setShowModal={setShowModal}
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          user={user}
          setUser={setUser}
        
        />
        <Navbar setShowModal={()=>{
            console.log("clicked")
            openModal()}}
        />
        <Routes>
          <Route path='/' element={
            <>
              {/* {showAddTask==true && <AddTasks addTask={(task)=>{addTask(task)}}/>}     
              <Tasks tasks={tasks} setTasks={setTasks}/> */}
            </>
          }/>
          <Route path='/about' element={<About/>}/>
          <Route path='/task/:id' element={<TaskDetails/>}/>
          {/* <Route path='/' exact component={Home} /> */}
          <Route path='/services' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/contact-us' element={<LoanPayment/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/marketing' element={<Marketing/>} />
          <Route path='/consulting' element={<Consulting/>} />
          <Route path='/random' element={<Random/>} />
        </Routes>

        {/* Playing with Sign up*/}
        {/* <div>
          <label>
            email:
            <input 
            type="email" 
            value={email}
            placeholder={email}
            onChange={(event)=>{
              //console.log(event.target.value)
              VerifyEmail(event.target.value)
              setEmail(event.target.value)}}/>
          </label>
          <label>
            password:
            <input 
            type="password" 
            value={password}
            placeholder={password}
            onChange={(event)=>{
              //console.log(event.target.value)
              VerifyPassword(event.target.value)
              setPassword(event.target.value)}}/>
          </label>
          <label>
            name:
            <input 
            type="text" 
            value={name}
            onChange={(event)=>{
              //console.log(event.target.value)
              VerifyName(event.target.value)
              setName(event.target.value)}}/>
          </label>
          <button
            onClick={()=>{CreateAccount(name, email,password)}}
          >
            Create
          </button>
          <button
            onClick={()=>{v9_auth.signOutUser(()=>{"Signed Out"},(e)=>console.log(e))}}
          >
            SignOut
          </button>
          <button
            onClick={()=>{SignInAccount(email,password)}}
          >
            SignIn
          </button>
          <ul>
          {Object.keys(signUpError).map((item)=>{

            if(signUpError[item]!==undefined){
              return(
                <li key={item}>
                  <p>{signUpError[item]}</p>
                </li>
                )
            }

          })}
        </ul>
        {signedIn==true?
        <p>
          user is signed in {user.displayName}

        </p>:
        <p>
          no user is signed in
        </p>
        }
        </div> */}

        
      </div>
    </Router>
  );
}
const tasks_var=[
  {
      id:1,
      text:'Doctors Appointment',
      day:'Feb 5th at 2:30pm',
      reminder: true,
  },
  
  {
      id:2,
      text:'Meeting at School',
      day:'Feb 6th at 1:30pm',
      reminder: true,

  },

  {
      id:3,
      text: 'Food Shopping',
      day:'Feb 5th at 2:30pm',
      reminder: false, 
  },
  
  {
      id:4,
      text: 'Food Shopping',
      day:'Feb 5th at 2:30pm',
      reminder: false, 
  }

]
export default App;