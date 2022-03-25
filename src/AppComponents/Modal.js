import React, { useRef,useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import * as v9_auth from '../../src/api/v9_auth';


const Modal = (props) => {

  //Modal Code
  const showModal=props.showModal
  const setShowModal=props.setShowModal
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

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
  const signedIn=props.signedIn;
  const setSignedIn=props.setSignedIn;
  const user=props.user;
  const setUser=props.setUser;
  const [create,setCreate]=useState(false);
  useEffect(()=>{

    v9_auth.setOnAuthStateChanged(
      (user)=>{
        setSignedIn(true)
        setUser(user)
      },
      (e)=>{setSignedIn(false)
        console.log(e)}
    )
       return ()=> {
      console.log("Safely Aborted")
      // if (typeof  unSubscribe_SnapShotbooks === 'function') {
      //   unSubscribe_SnapShotbooks()
      // }
    }
  },[]);

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
   v9_auth.db_createAccount(user, ()=>{console.log("successfull")},(e)=>{console.log(e,"creation fail")})
//    Authentication.createAccount(
//     { name: username, email, password },
//     (user) => {

//         const Credentials = {
//             displayName: user.displayName,
//             email: user.email,
//             uid: user.uid,
//             totalDistance: 0,
//             runCount: 0,
//             goalDistance: 0,
//             goalTime: 0,
//             strideDistance: 0,
//             longestDistance: 0,
//             fastestPace: 0,
//             joinDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
//             description: description,
//         }

//         Firestore.db_createAccount(Credentials, 
//             () => {
//                 navigation.dispatch(CommonActions.reset({ 
//                     index: 0, 
//                     routes: [{ name: "GuideScreen" }]
//                 }))
//             },
//             () => {
//                 console.log('registration failed')
//                 setIsRegisterLoading(false);
//             },
//         )

//         if (displayPicture.uri !== "") {
//             Firestore.storage_newUserUploadProfilePic(user.uid, displayPicture.uri);
//         }
// },
  //  setSignedIn(true)
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


  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={require('../image/SignUpModal.jpg')} alt='camera' />
              <ModalContent>

                <h1>Are you ready?</h1>
                <p>Are you ready for your next big purchase?</p>
                {/* <button>Join Now</button> */}
                {/* Playing with Sign up*/}
                { signedIn==false &&
                <div       style={{ backgroundColor:  'red', alignItems:'flex-end'}}>
                  <div style={{ backgroundColor:  'yellow', alignItems:'flex-start'}}>
                    <label style={{ backgroundColor:  'pink', alignItems:'flex-end'}}>
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
                  </div>
                  <div>
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
                  </div>
                </div>
                }
                
                {(signedIn==false && create==true &&  signedIn==false) &&
                  <div>
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
                  </div>
                }
                <div>
                  {(signedIn==false && create==true) &&
                    (
                    <div >
                    
                      <div>
                        <button
                          onClick={()=>{CreateAccount(name, email,password)}}
                        >
                          Create
                        </button>
                      </div>
                      <div>
                        <a onClick={()=>setCreate(false)}>Sign in</a>
                      </div>
                    </div>)
                  } 
                  {signedIn==true &&
                    <button
                      onClick={()=>{v9_auth.signOutUser(()=>{"Signed Out"},(e)=>console.log(e))}}
                    >
                      SignOut
                    </button>
                  }
                  {(signedIn==false && create==false )&&
                    (
                    <div style={{ backgroundColor:  'pink', alignItems:'center'}}>
                      <div>
                        <button
                          onClick={()=>{SignInAccount(email,password)}}
                        >
                          SignIn
                        </button>
                        </div>
                        <div>
                        <a onClick={()=>setCreate(true)}>Create Account</a>
                      </div>
                    </div>
                    )
                  } 
                  <ul>
                  {Object.keys(signUpError).map((item)=>{

                    if(signUpError[item]!==undefined){
                      return(
                        <li key={item}>
                          <p style={{fontSize:'10px',color:"red"}}>{signUpError[item]}</p>
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
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
export default Modal