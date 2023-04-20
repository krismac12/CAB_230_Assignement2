// Imports
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Popups from "../Components/Popups";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from "react";
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

    const [rowData,setRowData] = useState([
        {title: "Title",year: 1982,imdbRating: 7.5,rottenTomatoesRating:98,metacriticRating:99,imdbID: "imasidaasidm"},
        {title: "Title2",year: 1984,imdbRating: 7.5,rottenTomatoesRating:98,metacriticRating:99},
        {title: "Title2",year: 1984,imdbRating: 7.5,rottenTomatoesRating:98,metacriticRating:99}
    ])

    const columnDefs = [
        {field: 'title',sortable: true, cellRendererFramework: (params)=><div><Link to={`/movies/${params.data.imdbID}`}>{params.value}</Link></div>},
        {field: 'year',sortable: true},
        {field: 'imdbRating',sortable: true},
        {field: 'rottenTomatoesRating',sortable: true},
        {field: 'metacriticRating',sortable: true}

    ]

    const[columns,setColumns] = useState(3)
    
    return(
        <div id="page">
            <div className="main">
                <Navbar></Navbar>
                <div className="content">
                    <h4>Movies Page</h4>
                    <Link to ="/movie/person/nm0000191" className={disabled ? "disabled-link" : "normal"}>
                        <Button className="text-light" variant="dark" disabled = {disabled}>Person Data</Button>
                    </Link>
                    <div className="ag-theme-alpine" style={{height: (45*columns + 70), width:'100%'}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
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