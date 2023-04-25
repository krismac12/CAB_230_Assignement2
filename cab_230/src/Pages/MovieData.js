// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useEffect, useState } from "react";
import { fetchMovie } from "../API-Calls/MovieCalls";
import { useParams } from "react-router-dom";


/*
This component renders a page responsible for showing specific movie data 
*/
export default function Movies(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)

    // defines wether the page is loading
    const [loading,setLoading] = useState(true)

    const[movie,setMovie] = useState()
    const { id } = useParams()

    useEffect(() =>{
        fetchMovie(id)
        .then(res =>{
            setMovie(res)
            setLoading(false)
        })
    },[])


    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    {loading ?
                        <div>
                            <p>Loading</p>
                        </div>
                        :
                        <div>
                            <h4>{movie.title}</h4>
                            <p>Release Year: {movie.year}</p>
                            <p>Country: {movie.country}</p>
                            <p>Box office: {movie.boxoffice}</p>
                        </div>
                    }
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