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
                setCurrent(res.pagination.to)
            });
    }, []);

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
    }, 400);

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

    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Page</h4>
                    <Link to ="/movie/person/nm0000191" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>Person Data</Button>
                    </Link>
                    {/* Form for searching movies */}
                    <div id="Search">
                        <Form>
                            <Form.Group className="my-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    className='w-50'
                                    name = "movieTitle"
                                    ref={movieTitleRef}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mt-2 mb-4">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    className='w-50'
                                    name = "movieYear"
                                    ref={movieYearRef}
                                    type = "number"
                                    min="1900"
                                    max="2023"
                                ></Form.Control>
                            </Form.Group>
                            <Button className="text-light" variant="dark"  onClick={() => handleSearch()}>search</Button>
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
                        <p>Showing {current} out of {total} movies</p>
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