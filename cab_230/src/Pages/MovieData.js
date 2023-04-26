// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Alert,Card } from "react-bootstrap";
import Popups from "../Components/Popups";
import { useEffect, useState } from "react";
import { fetchMovie } from "../API-Calls/MovieCalls";
import { useParams } from "react-router-dom";
import MovieDataCSS from "../CSS/MovieData.module.css"
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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

    // Used to store movie data
    const[movie,setMovie] = useState()
    // IMDB id from url
    const { id } = useParams()


    const [rowData,setRowData] = useState([
        {}
    ])

    const columnDefs = [
        {field: 'category',sortable: true,headerName:"Role",width:150},
        {field: 'name',sortable: true,headerName:"Name",cellRendererFramework: (params)=><div><Link to={`/movie/person/${params.data.id}`}>{params.value}</Link></div>,width:270},
        {field: 'characters',sortable: true,headerName:"Characters",width:336}

    ]

    // Fetches movie data on load
    useEffect(() =>{
        fetchMovie(id)
        .then(res =>{
            setMovie(res)
            setRowData(res.principals)
            setLoading(false)
        })
    },[id])


    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    {loading ?
                        <div>
                            <p>Loading...</p>
                        </div>
                        :
                        <div>
                            {/* Card to display movie details */}
                            <Card>
                              <Card.Body>
                                <div className="d-flex align-items-start ">
                                    <div className="flex-grow-1" id={MovieDataCSS.movieDetailsText}>
                                    <Card.Title ><h2>{movie.title}</h2></Card.Title>
                                        <Card.Text style={{width: '90%' }}>
                                            Release Year: {movie.year}<br />
                                            Runtime: {movie.runtime} minutes<br/>
                                            Country: {movie.country}<br />
                                            Genres: {movie.genres.join(", ")}<br/>
                                            { movie.boxoffice?
                                            <div>
                                                Box office: ${movie.boxoffice.toLocaleString()}<br />
                                            </div>
                                            :""
                                            }
                                            <br/>
                                            <h4>Plot Summary:</h4>
                                            {movie.plot}
                                        </Card.Text>
                                    </div>
                                    <div id={MovieDataCSS.movieRatings}>
                                        {/* To Display Ratings */}
                                        <Card.Text>
                                            <div className="d-flex justify-content-end">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png?20200406194337" alt="" id={MovieDataCSS.movieRatingsLogos}></img>
                                                <span style={{marginLeft: "10px"}}>{movie.ratings[0].value}</span>
                                            </div>
                                            <br/>
                                            { movie.ratings[1].value != null ?
                                            <div>
                                                <div className="d-flex justify-content-end">
                                                    <img src="https://www.rottentomatoes.com/assets/pizza-pie/images/rottentomatoes_logo_40.336d6fe66ff.png" alt="" id={MovieDataCSS.movieRatingsLogos}></img>
                                                    <span style={{marginLeft: "10px"}}>{movie.ratings[1].value}</span>
                                                </div>
                                                <br/>
                                            </div>
                                            :""
                                            }
                                            { movie.ratings[2].value != null ?
                                            <div className="d-flex justify-content-end">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/1089px-Metacritic_logo.svg.png?20180714112338" alt="" id={MovieDataCSS.movieRatingsLogos}></img>
                                                <span style={{marginLeft: "10px"}}>{movie.ratings[2].value}</span>
                                            </div>
                                            :""
                                            }
                                        </Card.Text>
                                    </div>
                                  <Card.Img src={movie.poster}    id={MovieDataCSS.poster}/>
                                </div>
                              </Card.Body>
                            </Card>
                            <br></br>
                            <div className="mx-auto" style={{width:"60%" }}>     
                                <div className="ag-theme-alpine">
                                    <h4>Cast of {movie.title}:</h4>
                                    <AgGridReact
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        domLayout="autoHeight"
                                    />
                                </div>
                            </div>
                            <br/>
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