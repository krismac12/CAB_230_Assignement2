// Import Necessary Files
import Navbar from "../Components/Navbar"
import Homecss from "../CSS/Home.module.css"
import Popups from "../Components/Popups";
import "../CSS/Main.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
/*
This component renders the Home page which is the default page
The page also has the welcome message displayed as well as a 'Movie' scene background
*/

// Function the returns a random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// Home Component
export default function Home(){

    // Defines text for the top and bottom of the page
    const topText = ["Kristan Macaraeg's Very ", <br />, 'Epic Movie Searching',<br/>,"Website"];
    const botText = ["All data is from IMDB, Metacritic and", <br />, 'RottenTomatoes',<br/>,"© 2023 Kristan Macaraeg"];

    //Images used for the background of page
    const imageUrls = ["../../Images/Movie_1.png","../../Images/Movie_2.png","../../Images/Movie_3.png","../../Images/Movie_4.png","../../Images/Movie_5.png"];

    const [imageNumber,setImageNumber] = useState(getRandomNumber(0,4)) 

    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // useEffect hook to set new ImageNumber after a set interval
    useEffect(() => {
        const interval = setInterval(() => {
            setImageNumber(getRandomNumber(0,4));
        }, 60000);

        // Resets the interval
        return () => clearTimeout(interval);
      }, []);

    // Defines wether to display alert and what message to display
    const{display,message} = useSelector(state => state.Alerts)

    // Render Home Component
    return(
        <div id = "page">
            <div id={Homecss.main} style={{ backgroundImage: `url(${imageUrls[imageNumber]})` }} className="main-darken">
                <Navbar></Navbar>
                <div className = "content">
                    <p className="text-light" id = {Homecss.top_text}>{topText}</p>
                </div>
                <p className="fixed-bottom text-light" id = {Homecss.bot_text}>{botText}</p>
            </div>
            {/* Renders Alert message */}
            <Alert show={display} variant="success" id="successful-alert">
                {message}
            </Alert>
            {/* Renders Popups */}
            <Popups/>
            <html className={htmlClassName} />
        </div>
        
    )
}