import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import NavbarCss from "../CSS/Navbar.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeClicked, movieClicked,enable,enableRegister, pageSwitch } from "../redux/NavbarReducer";

export default function Navbar(){

    const location = useLocation();

    /*
    const homeDisabled = location.pathname === "/";
    const homeColor = homeDisabled ? "text-info" : "text-light";
    
    const moviesDisabled = location.pathname === "/movies";
    const moviesColor = moviesDisabled ? "text-info" : "text-light";
    */

    const{ homeDisabled, homeColor,moviesDisabled,moviesColor,register,login,disabled } = useSelector(state => state.Navbar)
    const dispatch = useDispatch();


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

    const navbarStyle = location.pathname === "/" ?{
        opacity: 0.8,
      }
      :
      {
        opacity: 1,
      }

    


    return(
        <Nav className="bg-dark" style={navbarStyle} id={NavbarCss.top}>
            <div className="d-flex justify-content-between">
                <Link to="/" className={homeDisabled ? "disabled-link" : "normal"}>
                    <Button className={homeColor} variant="dark" disabled={homeDisabled}><h4 className="nav-button">Home</h4></Button>
                </Link>
                <Link to ="/movies" className={moviesDisabled ? "disabled-link" : "normal"}>
                    <Button className={moviesColor} variant="dark" disabled={moviesDisabled}><h4 className="nav-button">Movies</h4></Button>
                </Link>
                <Button className="text-light" variant="dark"  disabled={disabled}  onClick={() => dispatch(enableRegister())}><h4 className="nav-button">Register</h4></Button>
                <Button className="text-light" variant="dark" disabled={disabled}><h4 className="nav-button">Login</h4></Button>
            </div>
        </Nav>
    )
}

