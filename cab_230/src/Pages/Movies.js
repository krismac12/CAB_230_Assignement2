// Imports
import Navbar from "../Components/Navbar"
import Register from "../Components/Register";
import Popup from "../Components/Popup";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

/*
Component for rendering the movies search page
*/

export default function Movies(){
    // Defines the Navbar states specifically the register state that defines if the register popup is being rendered
    const registerPopup = useSelector(state => state.Navbar.register)
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";
    
    // Defines wether to display alert and what message to display
    const{display,message} = useSelector(state => state.Alerts)

    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Page</h4>
                    <Link to ="/movie/data" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>movie Data</Button>
                    </Link>
                </div> 
            </div>
            {/* Renders Alert message */}
            <Alert show={display} variant="success" id="successful-alert">
                {message}
            </Alert>
            {/* renders the register popup */}
            <Popup trigger = {registerPopup}>
                <Register></Register>
            </Popup>
            <html className={htmlClassName} />
        </div>
    )
}