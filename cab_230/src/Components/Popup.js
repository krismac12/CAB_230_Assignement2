// Imports
import React from 'react'
import { useDispatch } from 'react-redux';
import { enable } from '../redux/NavbarReducer';
import CloseButton from 'react-bootstrap/CloseButton';



/*
This components is responsible for any popup components
the component only renders the popup if the trigger is set to true
*/

function Popup(props) {
  const dispatch = useDispatch();
  /* returns the props.children if trigger is true */
  return (props.trigger) ? (
    <div className='popup'>
      <CloseButton className='btn-close' onClick={() => dispatch(enable())}></CloseButton>
      { props.children }
    </div>
  ) : "";
}

export default Popup