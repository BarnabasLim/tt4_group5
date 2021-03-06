import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const setShowModal=props.setShowModal;
  const setShowModal2=props.setShowModal2;
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          EPIC
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/loan-payment'
              className='nav-links'
              onClick={()=>{
                closeMobileMenu()
                console.log("clicked")
              }}
            >
              Loans Payment
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={()=>{
                closeMobileMenu()
                setShowModal()
                console.log("clicked")
              }}
            >
              Sign Up Here
            </Link>
          </li>
          {/* <li>
            <Link
              to='/random'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Random
            </Link>
          </li> */}
        </ul>
        <Button 
          setShowModal={setShowModal} 
        
        
        />
        {/* <Button 
          setShowModal2={setShowModal2} 
        
        
        /> */}
      </nav>
    </>
  );
}

export default Navbar;