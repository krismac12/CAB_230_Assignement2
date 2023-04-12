import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import NavbarCss from "../CSS/Navbar.module.css"

export default function Navbar(){

    const location = useLocation();

    const homeDisabled = location.pathname === "/";
    const homeColor = homeDisabled ? "text-info" : "text-light";
    
    const moviesDisabled = location.pathname.includes("/movies");
    const moviesColor = moviesDisabled ? "text-info" : "text-light";

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
                <Link to="/">
                    <Button className={homeColor} variant="dark" disabled={homeDisabled}><h4 className="nav-button">Home</h4></Button>
                </Link>
                <Link to ="/movies">
                    <Button className={moviesColor} variant="dark" disabled={moviesDisabled}><h4 className="nav-button">Movies</h4></Button>
                </Link>
                <Link to = "/register">
                    <Button className="text-light" variant="dark"><h4 className="nav-button">Register</h4></Button>
                </Link>
                <Link to = "/login">
                    <Button className="text-light" variant="dark"><h4 className="nav-button">Login</h4></Button>
                </Link>
            </div>
        </Nav>
    )
}