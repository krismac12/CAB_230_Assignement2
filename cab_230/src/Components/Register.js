// Imports
import React from 'react'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../API-Calls/UserCalls';
import { Alert, } from 'react-bootstrap';
import { disableRegister } from '../redux/NavbarReducer';
import { display } from '../redux/AlertsReducer';

/*
Component for rendering the register popup
Allowing users to register an account
*/
function Register() {
  const dispatch = useDispatch();

  // validated to check wether user input is valid
  const [validated, setValidated] = useState(false)

  const [showError,setError] = useState(false)
  const [message,setMessage] = useState("")

  // to store user input
  const [formData, setFormData] = useState({
    email: "",
    password:"",
    confirm:""
  })

  // handle user input sets form data
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // validates password fits constraints
  const validatePassword = () => {
    // Password must be at least 8 characters long and have one capital letter
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(formData.password);
  }

  // validates confirm is the same as password
  const validateConfirm = () => {
    // Confirm must be the same as password
    return formData.password === formData.confirm
  }


  // function called when form submits
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // checks form validity stops event if not valid
    if (form.checkValidity() === false) {
      console.log("Not Valid")
      event.stopPropagation();
    } else {

    }
    // sets validated as true
    setValidated(true);

    // Post Request with formData to register user
    registerUser(formData)
    .then(res => {

      // if error set error as true and display message
      if(res.error){
        setError(true)
        setMessage(res.message)
      }
      else{
        // Disable register component
        dispatch(disableRegister())
        // Display alert showing user was created
        dispatch(display({ message: "User created" }))
      }
    })
  };

  return (
    <div>
      <h4>Register Now</h4>
      {/* Form for user registration */}

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
            Invalid Email
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
          isInvalid={formData.password && !validatePassword(formData.password)}
          isValid={formData.password && validatePassword(formData.password)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Password must be at least 8 characters long and contain at least one capital letter.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password Input */}
        <Form.Group className="mt-3 mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          required
          type='password' 
          placeholder='Confirm Password'
          name = 'confirm'
          value = {formData.confirm}
          onChange={handleChange}
          isInvalid={formData.confirm && !validateConfirm(formData.confirm)}
          isValid={formData.confirm && validateConfirm(formData.confirm)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="feedback-message">
            Passwords must match
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="text-light" variant="dark"  type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default Register