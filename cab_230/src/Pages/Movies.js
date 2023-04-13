import Navbar from "../Components/Navbar"
import Register from "../Components/Register";
import Popup from "../Components/Popup";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


export default function Movies(){
    const registerPopup = useSelector(state => state.Navbar.register)
    const disabled = useSelector(state => state.Navbar.disabled)

    return(
        <div id="page">
            <div id="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Page</h4>
                    <Link to ="/movie/data" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>movie Data</Button>
                    </Link>
                </div> 
            </div>
            <Popup trigger = {registerPopup}>
                <Register></Register>
            </Popup>
        </div>
    )
}