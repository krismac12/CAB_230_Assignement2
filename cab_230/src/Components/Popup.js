// Imports
import React from 'react'
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { enable } from '../redux/NavbarReducer';


/*
This components is responsible for any popup components
the component only renders the popup if the trigger is set to true
*/

function Popup(props) {
  const dispatch = useDispatch();
  /* returns the props.children if trigger is true */
  return (props.trigger) ? (
    <div className='popup'>
      <Button className='btn-close' onClick={() => dispatch(enable())}></Button>
      { props.children }
    </div>
  ) : "";
}

export default Popup