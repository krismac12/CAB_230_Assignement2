// Imports
import React from 'react'
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { enable } from '../redux/NavbarReducer';
/*
Component for rendering the register popup
Allowing users to register an account
*/

function Register() {
  const dispatch = useDispatch();
  return (
    <div>
      <p>register</p>
      <Button className="text-light" variant="dark" onClick={() =>dispatch(enable())}>Register</Button>
    </div>
  )
}

export default Register