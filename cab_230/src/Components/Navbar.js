import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import NavbarCss from "../CSS/Navbar.module.css"
import { useState } from "react";

export default function Navbar(props){

    const location = useLocation();

    const homeDisabled = location.pathname === "/";
    const homeColor = homeDisabled ? "text-info" : "text-light";
    
    const moviesDisabled = location.pathname === "/movies";
    const moviesColor = moviesDisabled ? "text-info" : "text-light";

    const navbarStyle = location.pathname === "/" ?{
        opacity: 0.8,
      }
      :
      {
        opacity: 1,
      }

    

    const handleUpdateRegister = () =>{
        props.updateRegister(true)
    }

    const handleUpdateLogin = () =>{
        props.setLogin(true)
    }

    return(
        <Nav className="bg-dark" style={navbarStyle} id={NavbarCss.top}>
            <div className="d-flex justify-content-between">
                <Link to="/">
                    <Button className={homeColor} variant="dark" disabled={homeDisabled}><h4 className="nav-button">Home</h4></Button>
                </Link>
                <Link to ="/movies">
                    <Button className={moviesColor} variant="dark" disabled={moviesDisabled}><h4 className="nav-button">Movies</h4></Button>
                </Link>
                <Button className="text-light" variant="dark" onClick={handleUpdateRegister}><h4 className="nav-button">Register</h4></Button>
                <Button className="text-light" variant="dark"><h4 className="nav-button">Login</h4></Button>
            </div>
        </Nav>
    )
}