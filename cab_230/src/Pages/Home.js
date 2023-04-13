import Navbar from "../Components/Navbar"
import Homecss from "../CSS/Home.module.css"
import Register from "../Components/Register";
import Popup from "../Components/Popup";
import "../CSS/Main.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export default function Home(){

    const topText = ["Kristan Macaraeg's Very ", <br />, 'Epic Movie Searching',<br/>,"Website"];
    const botText = ["All data is from IMDB, Metacritic and", <br />, 'RottenTomatoes',<br/>,"© 2023 Kristan Macaraeg"];

    const imageUrls = ["../../Images/Movie_1.png","../../Images/Movie_2.png","../../Images/Movie_3.png","../../Images/Movie_4.png","../../Images/Movie_5.png"];

    const [imageNumber,setImageNumber] = useState(getRandomNumber(0,4)) 

    const registerPopup = useSelector(state => state.Navbar.register)

    useEffect(() => {
        const interval = setInterval(() => {
            setImageNumber(getRandomNumber(0,4));
        }, 60000);
    
        return () => clearTimeout(interval);
      }, []);

    return(
        <div id = "page">
            <div id={Homecss.main} style={{ backgroundImage: `url(${imageUrls[imageNumber]})` }}>
                <Navbar></Navbar>
                <div className = "content">
                    <p className="text-light" id = {Homecss.top_text}>{topText}</p>
                </div>
                <p className="fixed-bottom text-light" id = {Homecss.bot_text}>{botText}</p>
            </div>
            <Popup trigger = {registerPopup}>
                <Register></Register>
            </Popup>
        </div>
    )
}