// Imports
import Navbar from "../Components/Navbar"
import Register from "../Components/Register";
import Popup from "../Components/Popup";
import { useSelector } from "react-redux";
/*
This component renders a page responsible for showing specific movie data 
*/
export default function Movies(){
    // Defines the Navbar states specifically the register state that defines if the register popup is being rendered
    const registerPopup = useSelector(state => state.Navbar.register)
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    return(
        <div id="page">
            <div id="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Data</h4>
                </div>
            </div>
            {/* renders the register popup */}
            <Popup trigger = {registerPopup}>
                <Register></Register>
            </Popup>
        </div>
    )
}