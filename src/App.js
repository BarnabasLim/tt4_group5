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
import ContactUs from './screens/ContactUsScreen/ContactUs';
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
        
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Navbar />
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
          <Route path='/contact-us' element={<ContactUs/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/marketing' element={<Marketing/>} />
          <Route path='/consulting' element={<Consulting/>} />
          <Route path='/random' element={<Random/>} />
        </Routes>

        {/* Playing with Sign up*/}
        <div>
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
        </div>

        
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