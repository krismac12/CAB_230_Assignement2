//Import Necessary Files
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import NavbarCss from "../CSS/Navbar.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeClicked, movieClicked,enable,enableRegister, pageSwitch } from "../redux/NavbarReducer";

/*
This component renders the Navbar that appears at the top of most pages
which is responsible for the main navigation of each page
*/

// Navbar Component
export default function Navbar(){
    
    // Defines the current page location
    const location = useLocation();

    // Defines the navbar states such as disabled buttons and colours
    const{ homeDisabled, homeColor,moviesDisabled,moviesColor,register,login,disabled } = useSelector(state => state.Navbar)
    const dispatch = useDispatch();

    // Dispatches a different action depending on current page location
    switch(location.pathname){
        case "/":
            if(!register){
                dispatch(homeClicked())
            }
            break
        case "/movies":
            if(!register){
                dispatch(movieClicked())
            }
            break
        default:
            if(!register){
                dispatch(pageSwitch())
            }
            break
    }

    // Changes the opacity of the navbar
    const navbarStyle = location.pathname === "/" ?{
        opacity: 0.8,
      }
      :
      {
        opacity: 1,
      }

    

    // Render Navbar Component
    return(
        <Nav className="bg-dark" style={navbarStyle} id={NavbarCss.top}>
            <div className="d-flex justify-content-between">
                <Link to="/" className={homeDisabled ? "disabled-link" : "normal"}>
                    <Button className={homeColor} variant="dark" disabled={homeDisabled}><h4 className="nav-button">Home</h4></Button>
                </Link>
                <Link to ="/movies" className={moviesDisabled ? "disabled-link" : "normal"}>
                    <Button className={moviesColor} variant="dark" disabled={moviesDisabled}><h4 className="nav-button">Movies</h4></Button>
                </Link>
                {/* Dispatches the enableRegister Action on click */}
                <Button className="text-light" variant="dark"  disabled={disabled}  onClick={() => dispatch(enableRegister())}><h4 className="nav-button">Register</h4></Button>
                <Button className="text-light" variant="dark" disabled={disabled}><h4 className="nav-button">Login</h4></Button>
            </div>
        </Nav>
    )
}

