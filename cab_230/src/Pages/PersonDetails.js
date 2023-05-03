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
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import PersonDataCSS from "../CSS/PersonData.module.css"
import { Bar } from 'react-chartjs-2';
import {Chart,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from "chart.js"

/*
This component renders a page responsible for showing specific movie data 
*/


// Function for calculating the data for the bar graph
function getRoleBarGraphData(roles) {
  Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  )
  const counts = [
    { id: 0, rating: "0-1", count: 0 },
    { id: 1, rating: "1-2", count: 0 },
    { id: 2, rating: "2-3", count: 0 },
    { id: 3, rating: "3-4", count: 0 },
    { id: 4, rating: "4-5", count: 0 },
    { id: 5, rating: "5-6", count: 0 },
    { id: 6, rating: "6-7", count: 0 },
    { id: 7, rating: "7-8", count: 0 },
    { id: 8, rating: "8-9", count: 0 },
    { id: 9, rating: "9-10", count: 0 }
  ];

  roles.forEach(role => {
    // Extract the IMDB rating from the role object
    const imdbRating = role.imdbRating;

    // Determine the rating range that the movie falls into and increment the corresponding count in the array of objects
    if (imdbRating >= 0 && imdbRating < 1) {
      counts[0].count++;
    } else if (imdbRating >= 1 && imdbRating < 2) {
      counts[1].count++;
    } else if (imdbRating >= 2 && imdbRating < 3) {
      counts[2].count++;
    } else if (imdbRating >= 3 && imdbRating < 4) {
      counts[3].count++;
    } else if (imdbRating >= 4 && imdbRating < 5) {
      counts[4].count++;
    } else if (imdbRating >= 5 && imdbRating < 6) {
      counts[5].count++;
    } else if (imdbRating >= 6 && imdbRating < 7) {
      counts[6].count++;
    } else if (imdbRating >= 7 && imdbRating < 8) {
      counts[7].count++;
    } else if (imdbRating >= 8 && imdbRating < 9) {
      counts[8].count++;
    } else if (imdbRating >= 9 && imdbRating <= 10) {
      counts[9].count++;
    }
  });
  return {
    labels: counts.map((count) => count.rating),
    datasets: [
      {
        label : "Number of Movies",
        data : counts.map((count) => count.count),
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }
}


export default function PersonDetails(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)


    // Defines wether the page is loading
    const [loading,setLoading] = useState(true)
    // Defines wether the user has access to the page
    const [access,setAccess] = useState(true)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)
    
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.Auth.loggedIn)

    // To store person data
    const [person,setPerson] = useState({})

    const { id } = useParams();


    // To store data about the roles of a person
    const [roleData,setRoleData] = useState([
      {}
    ])

    // To be displayed in a graph
    const [roleGraphData,setRoleGraphData] = useState([
      {}
    ])

    

    // Defines the columns of the grid
    const columnDefs = [
      {field: 'category',sortable: true,headerName:"Role",width:"100%"},
      {field: 'movieName',sortable: true,headerName:"Movie",cellRendererFramework: (params)=><div><Link to={`/movie/data/${params.data.movieId}`}>{params.value}</Link></div>,width:"500%"},
      {field: 'characters',sortable: true,headerName:"Characters",width:"300%"},
      {field: 'imdbRating',sortable: true,headerName:"Rating",width:"100%"}

    ]

    // fetches person data when pages is loaded and refresh bearer token if expired
    const useHandlePageLoad = () =>{
      useEffect(() => {
        fetchPerson(id, cookie.load('Bearer Token'))
          .then(res => {
            console.log(res)
            // to refresh bearer token
            if (res.error) {
              PostRefreshToken(cookie.load('Refresh Token'))
              .then(res => {
                console.log(res)
                // if refresh token is invalid remove page access
                if (res.error) {
                  setAccess(false)
                  setLoading(false)
                  cookie.remove('Bearer Token')
                  cookie.remove('Refresh Token')
                  dispatch(logout()) 
                  dispatch(displayAlert({ message: "Login Expired",variant: "danger"}))
                } else {
                  // store new refresh and bearer token
                  const refreshTokenPromise = cookie.save('Refresh Token', res.refreshToken.token);
                  const bearerTokenPromise = cookie.save('Bearer Token', res.bearerToken.token);
                
                  // update the cookies and reload the page
                  async function reloadPage() {
                    await refreshTokenPromise
                    await bearerTokenPromise
                    window.location.reload()
                  }
                
                  reloadPage();
                }
              })
            }
            if (!res.error) {
              setPerson(res)
              setRoleData(res.roles)
              const data = getRoleBarGraphData(res.roles)
              setRoleGraphData(data)  
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
                <div className="d-flex align-items-start ">
                  <div className="flex-grow-1">
                      <h3>{person.name}</h3>
                      <p className="fs-4">{person.birthYear} - {person.deathYear}</p>
                  </div>
                </div>
                <br/>
                <div className="ag-theme-alpine mx-auto" style={{width:'80%'}}>
                    <AgGridReact
                      rowData={roleData}
                      columnDefs={columnDefs}
                      domLayout="autoHeight"
                      pagination={true}
                      paginationPageSize={10}
                    />
                </div>
                <br/>
                <div id={PersonDataCSS.Bar_Chart} className="mx-auto">
                  <h4>IMDB Ratings at a glance</h4>
                  <Bar data={roleGraphData} height={"100%"}></Bar>
                </div>
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