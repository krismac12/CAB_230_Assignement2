//Import Necessary Files
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation, Link } from "react-router-dom";
import NavbarCss from "../CSS/Navbar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { homeClicked, movieClicked,enableRegister, pageSwitch,enableLogin } from "../redux/NavbarReducer";
import { logout } from "../redux/AuthReducer";
import { display } from "../redux/AlertsReducer";
import cookie from 'react-cookies'
import { logoutUser } from "../API-Calls/UserCalls";


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
    const loggedIn = useSelector(state => state.Auth.loggedIn)
    const dispatch = useDispatch();

    // Dispatches a different action depending on current page location
    switch(location.pathname){
        case "/":
            if(!register && !login){
                dispatch(homeClicked())
            }
            break
        case "/movies":
            if(!register && !login){
                dispatch(movieClicked())
            }
            break
        default:
            if(!register && !login){
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

    // To logout user
    const handleLogout = () =>{
        const refreshToken = cookie.load('Refresh Token')

        logoutUser(refreshToken)
        .then(res =>{
            dispatch(logout())
            dispatch(display({ message: "User Logged Out" }))
        })

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

                {loggedIn ? <Button className="text-light" variant="dark" disabled={disabled} onClick={() => handleLogout()}><h4 className="nav-button">Logout</h4></Button>
              
                : <div>
                {/* Dispatches the enableRegister Action on click */}
                <Button className="text-light" variant="dark"  disabled={disabled}  onClick={() => dispatch(enableRegister())}><h4 className="nav-button">Register</h4></Button>
                {/* Dispatches the enableLogin Action on click */}
                <Button className="text-light" variant="dark" disabled={disabled} onClick={() => dispatch(enableLogin())}><h4 className="nav-button">Login</h4></Button>
                </div>                
                }   
            </div>
        </Nav>
    )
}

