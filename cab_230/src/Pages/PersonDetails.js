// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useParams } from "react-router-dom";

/*
This component renders a page responsible for showing specific movie data 
*/
export default function PersonDetails(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)

    const { id } = useParams();

    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Person: {id}</h4>
                </div>
            </div>
            {/* Renders Alert message */}
            <Alert show={display} variant={variant} id="alert">
                {message}
            </Alert>
            {/* Renders Popups */}
            <Popups/>
            <html className={htmlClassName} />
        </div>
    )
}