// Imports
import Navbar from "../Components/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useParams } from "react-router-dom";
import { fetchPerson } from "../API-Calls/MovieCalls";
import cookie from 'react-cookies'
import { useState,useEffect } from "react";
import { PostRefreshToken } from "../API-Calls/UserCalls";
import { display  as displayAlert} from '../redux/AlertsReducer';
import { logout } from "../redux/AuthReducer";

/*
This component renders a page responsible for showing specific movie data 
*/
export default function PersonDetails(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)


    // defines wether the page is loading
    const [loading,setLoading] = useState(true)
    // defines wether the user has access to the page
    const [access,setAccess] = useState(true)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)
    
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.Auth.loggedIn)

    const [person,setPerson] = useState({})

    const { id } = useParams();



    // fetches person data when pages is loaded and refresh bearer token if expired
    const useHandlePageLoad = () =>{
        useEffect(() => {
            fetchPerson(id, cookie.load('Bearer Token'))
              .then(res => {
                // to refresh bearer token
                if (res.error) {
                  PostRefreshToken(cookie.load('Refresh Token'))
                    .then(res => {
                        // if refresh token is invalid remove page access
                        if (res.error) {
                            console.log(res)
                            setAccess(false);
                            setLoading(false);
                            dispatch(logout()) 
                      } else {
                            // store new refresh and bearer token
                            console.log(res)
                            cookie.save('Refresh Token', res.refreshToken.token);
                            cookie.save('Bearer Token', res.bearerToken.token);
                            console.log("refreshed Token")
                            window.location.reload()
                      }
                    })
                }
                if (!res.error) {
                  setPerson(res)
                  setLoading(false)
                }
              })
        }, [])
    }
    useHandlePageLoad()
    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                {/* renders depends on wether page is loading or user has access */}
                <div className="content">
                    {loading && loggedIn ? (
                      <h4>loading...</h4>
                    ) : access && loggedIn ? (
                        <div>
                            <h4>Person: {person.name}</h4>
                            <h4>Birth Year : {person.birthYear}</h4>
                        </div>
                    ) : (
                      <h4>access denied</h4>
                    )}
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