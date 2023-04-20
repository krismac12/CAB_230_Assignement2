// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { AgGridReact } from "ag-grid-react";
import { useState,useEffect } from "react";
import { fetchMovies } from "../API-Calls/MovieCalls";
import { Button, Col, Form, Row } from "react-bootstrap";



import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/*
Component for rendering the movies search page
*/

export default function Movies(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : ""
    
    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)

    const[pageNumber,setPageNumber] = useState(1)

    // Used for form data on search
    const [movieTitle,setMovieTitle] = useState(null)
    const [movieYear,setMovieYear] = useState(null)

    const[total,setTotal] = useState(null)


    // used for data table
    const [rowData,setRowData] = useState([
        {}
    ])


    // column definition of table
    const columnDefs = [
        {field: 'title',sortable: true, cellRendererFramework: (params)=><div><Link to={`/movies/data/${params.data.imdbID}`}>{params.value}</Link></div>, width: 400 },
        {field: 'year',sortable: true},
        {field: 'imdbRating',sortable: true},
        {field: 'rottenTomatoesRating',sortable: true},
        {field: 'metacriticRating',sortable: true}

    ]


    // to fetch first page of movies
    useEffect(() => {
        fetchMovies(null,null,null)
            .then(res => {
                setRowData(res.data)
                setTotal(res.pagination.total)
                console.log(res)
            });
    }, []);

    // to fetch first page of movies after search
    const handleSearch = (searchValues) => {
        fetchMovies(null, searchValues.title, searchValues.year)
          .then((res) => {
            setRowData(res.data)
            setTotal(res.pagination.total)
          });
    }
      

    console.log("rerender")
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
                        <h4>{total}</h4>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="my-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            name = "movieTitle"
                                            value = {movieTitle}
                                            onChange={(e) => setMovieTitle(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mt-2 mb-4">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control
                                            name = "movieYear"
                                            value = {movieYear}
                                            onChange={(e) => setMovieYear(e.target.value)}
                                            type = "number"
                                            min="1900"
                                            max="2023"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className="text-light" variant="dark"  onClick={() => handleSearch({ title: movieTitle, year: movieYear })}>search</Button>
                        </Form>
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