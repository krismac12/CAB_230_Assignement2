import React from 'react'
import Popup from './Popup'
import { useSelector } from 'react-redux'
import Register from './Register'
import Login from './Login'
/*
component used to render the different popups
*/
export default function Popups() {
    // useSelector hook to access the "register" and "login" property in the state of the Navbar component
    const registerPopup = useSelector(state => state.Navbar.register)
    const loginPopup = useSelector(state => state.Navbar.login)
  return (
    <div>
        {/* renders the register popup */}
        <Popup trigger = {registerPopup}>
            <Register></Register>
        </Popup>

        {/* renders the login popup */}
        <Popup trigger = {loginPopup}>
            <Login></Login>
        </Popup>
    </div>
  )
}
