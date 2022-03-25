//rafce short cut
import React from 'react'
import Button from './Button'
//impt
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Header = (props) => {
  //Better practice for props
  //Cleaner
  let title=props.title;
  let openForm=props.openForm;
  let showAddTask=props.showAddTask;
  let setShowModal=props.setShowModal;

  return (
      
    <header className='header'>
        <h1>Task Tracker {title}</h1>
        <Button 
          color={showAddTask?'red':'green'} 
          text={showAddTask?'Close':'Add'} 
          onClick={openForm}
        />
        <img src="https://media.vanityfair.com/photos/55c4a55f169027501c6ef80b/master/pass/t-bumble-app-whitney-wolfe.jpg"
                style={{
                  tintColor: "#000000",
                  resizeMode: "contain",
                  height: 50,
                  borderRadius:50,
                  aspectRatio: 1,
                }}
                onClick={()=>{
                  console.log("clicked")
                  setShowModal()}}
        >

        </img>

   
    </header>
  )
}
//Default Prop
Header.defaultProps={
    title:'Task Tracker',
}
//Control prop types
Header.PropType={
    title: PropTypes.string.isRequired, 
}

export default Header
