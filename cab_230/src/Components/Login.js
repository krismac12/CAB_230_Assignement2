// Imports
import React from 'react'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../API-Calls/UserCalls';
import { Alert, } from 'react-bootstrap';
import { disableLogin } from '../redux/NavbarReducer';
import { display } from '../redux/AlertsReducer';
import cookie from 'react-cookies'
import { login } from '../redux/AuthReducer';
/*
Component for rendering the login popup
Allowing users to login
*/
function Login() {
  const dispatch = useDispatch();

  // validated to check wether user input is valid
  const [validated, setValidated] = useState(false)

  const [showError,setError] = useState(false)
  const [message,setMessage] = useState("")

  // to store user input
  const [formData, setFormData] = useState({
    email: "",
    password:"",
  })

  // handle user input sets form data
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  // function called when form submits
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // checks form validity stops event if not valid
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

    }
    // sets validated as true
    setValidated(true);

    // Post Request with formData to login user
    loginUser(formData)
    .then(res => {

      // if error set error as true and display message
      if(res.error){
        setError(true)
        setMessage(res.message)
      }
      else{
        // Disable login component
        dispatch(disableLogin())
        // Display alert showing user was logged in
        dispatch(display({ message: "Login Successful",variant: "success" }))
        cookie.save('Refresh Token', res.refreshToken.token)
        cookie.save('Bearer Token', res.bearerToken.token)
        dispatch(login())

      }
    })
  };

  return (
    <div>
      <h4>Login</h4>
      {/* Form for user login */}

      <Alert show={showError} variant="danger">
        {message}
      </Alert>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        {/* Email Input */}
        <Form.Group className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          required 
          type='email' 
          placeholder='Email'
          name = "email"
          value = {formData.email}
          onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Please enter an Email
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          required
          type='password' 
          placeholder='Password'
          name = "password"
          value = {formData.password}
          onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Please enter a password
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="text-light" variant="dark"  type='submit'>Login</Button>
      </Form>
    </div>
  )
}

export default Login