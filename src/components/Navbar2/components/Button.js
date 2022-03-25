import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button(props) {
  let setShowModal=props.setShowModal;
  return (
    <Link to='sign-up'>
      <button className='btn' onClick={()=>{
        setShowModal()
        console.log("clicked Button")
      }       

      
      }>Sign Up</button>
    </Link>
  );
}