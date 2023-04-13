import Navbar from "../Components/Navbar"
import Register from "../Components/Register";
import Popup from "../Components/Popup";
import { useSelector } from "react-redux";



export default function Movies(){
    const registerPopup = useSelector(state => state.Navbar.register)

    return(
        <div id="page">
            <div id="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Data</h4>
                </div>
            </div>
            <Popup trigger = {registerPopup}>
                <Register></Register>
            </Popup>
        </div>
    )
}