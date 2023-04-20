// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { AgGridReact } from "ag-grid-react";
import { useState,useEffect } from "react";
import { fetchMovies } from "../API-Calls/MovieCalls";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/*
Component for rendering the movies search page
*/

export default function Movies(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";
    
    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)

    const[pageNumber,setPageNumber] = useState(1)
    const[movieTitle,setMovieTitle] = useState(null)
    const[movieYear,setMovieYear] = useState(null)

    const [rowData,setRowData] = useState([
        {}
    ])

    const columnDefs = [
        {field: 'title',sortable: true, cellRendererFramework: (params)=><div><Link to={`/movies/data/${params.data.imdbID}`}>{params.value}</Link></div>, width: 400 },
        {field: 'year',sortable: true},
        {field: 'imdbRating',sortable: true},
        {field: 'rottenTomatoesRating',sortable: true},
        {field: 'metacriticRating',sortable: true}

    ]


    useEffect(() => {
        fetchMovies(1, movieTitle, movieYear)
            .then(res => {
                setRowData(res.data);
                console.log(res)
            });
    }, []);

    const handleSearch = (searchValues) => {
        fetchMovies(1, searchValues.title, searchValues.year)
          .then((res) => {
            setRowData(res.data);
            console.log(res)
          });
      }
    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Page</h4>
                    <Link to ="/movie/person/nm0000191" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>Person Data</Button>
                    </Link>
                    <div id="Search">
                        <h4>Title</h4>
                        <input type= "Text" onChange={(e) => setMovieTitle(e.target.value)}></input>
                        <h4>Release Year</h4>
                        <input type="number" min="1900" max="2023" onChange={(e) => setMovieYear(e.target.value)}></input>
                        <h4>Search</h4>
                        <Button className="text-light" variant="dark" disabled={disabled} onClick={() => handleSearch({title: movieTitle,year: movieYear})}><h4>Search</h4></Button>
                    </div>
                    <div className="ag-theme-alpine" style={{width:'100%'}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            domLayout="autoHeight"
                        />
                    </div>
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