// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { AgGridReact } from "ag-grid-react";
import { useState,useEffect,useRef } from "react";
import { fetchMovies } from "../API-Calls/MovieCalls";
import { Button, Col, Form, Row } from "react-bootstrap";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


// function for setting and clearing debounce timer
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
}


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


    // find valid years in search
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

    // Used to set movie title and movie year
    const movieTitleRef = useRef(null);
    const movieYearRef = useRef(null);

    // Used for form data on search
    const[movieTitle,setMovieTitle] = useState()
    const[movieYear,setMovieYear] = useState()




    // Used to check total movies and how many movies are in the table
    const[total,setTotal] = useState(null)
    const[current,setCurrent] = useState(null)


    // used for data table
    const [rowData,setRowData] = useState([
        {}
    ])


    // column definition of table
    const columnDefs = [
        {field: 'title',sortable: true, cellRendererFramework: (params)=><div><Link to={`/movie/data/${params.data.imdbID}`}>{params.value}</Link></div>, width: 400 },
        {field: 'year',sortable: true},
        {field: 'imdbRating',sortable: true},
        {field: 'rottenTomatoesRating',sortable: true},
        {field: 'metacriticRating',sortable: true}

    ]




    // to set movie title year and page after search
    const handleSearch = () => {
        setMovieTitle(movieTitleRef.current.value)
        setMovieYear(movieYearRef.current.value)
        setPageNumber(1)
    }

    // fetch movie data after search
    useEffect(() => {
        fetchMovies(null, movieTitle, movieYear)
          .then((res) => {
            setRowData(res.data);
            setTotal(res.pagination.total);
            setCurrent(res.pagination.to);
            setPageNumber(1);
          });
    }, [movieTitle, movieYear]);


    // used to only fetch one page at a time when user scrolls to the bottom
    const debouncedHandleScroll = debounce(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
        if (scrollTop + windowHeight >= documentHeight * 0.95) {
          // User has scrolled to the bottom of the page
          setPageNumber(prev => prev+1);
        }
    }, 100);

    // call debouncedHandleScroll when user scrolls
    useEffect(() => {
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => window.removeEventListener('scroll', debouncedHandleScroll);
    }, [debouncedHandleScroll]);
    
    
    // fetch next page data
    useEffect(() => {
        if(current < total){
            fetchMovies(pageNumber, movieTitle, movieYear)
            .then(res => {
              setRowData(prevData => [...prevData, ...res.data]);
              setTotal(res.pagination.total);
              setCurrent(res.pagination.to);
            });   
        }
    }, [pageNumber]);

    // Clears form data 
    const handleClear= () =>{
        setMovieTitle()
        setMovieYear()
        movieTitleRef.current.value = ""
        movieYearRef.current.value = ""
    }

    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Search for Movies</h4>

                    {/*
                    <Link to ="/movie/person/nm0000191" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>Person Data</Button>
                    </Link>
                    */}

                    {/* Form for searching movies */}
                    <div id="Search" style={{width:'99%'}}>
                        <Form className="mt-3 " onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                            <Row>
                                <Col>
                                    <Form.Label>Movie Title</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Label>Release Year</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        name = "movieTitle"
                                        ref={movieTitleRef}
                                    ></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Select  name="movieYear" ref={movieYearRef} defaultValue="" >
                                      {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                      ))}
                                        <option key = "Select" value="">Any year</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Form.Group className="mt-4 mb-4 col-8 mx-auto">
                                <div className="d-flex justify-content-center justify-content-between">
                                    <Button className="text-light w-25 mx-1" variant="primary" onClick={() => handleSearch()} disabled = {disabled}>Search</Button>
                                    <Button className="text-light w-25 mx-1" variant="danger" onClick={() => handleClear()} disabled = {disabled}>Reset</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                    {/* Table to display movies */}
                    <div className="ag-theme-alpine" style={{width:'100%'}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            domLayout="autoHeight"
                        />
                    </div>
                    <div>
                        {current > 0 ?(<p>Showing {current} out of {total} movies</p>)
                            :(<p>No Movies to display</p>)
                        }
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