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


/*
This component renders a page responsible for showing specific movie data 
*/
export default function PersonDetails(){
    // Defines the disabled state used to disable UI elements in the page if a popup is on screen
    const disabled = useSelector(state => state.Navbar.disabled)


    // defines wether the page is loading
    const [loading,setLoading] = useState(true)
    // defines wether the user has access to the page
    const [access,setAccess] = useState(true)

    // Changes HTML class name when popup is visible
    const htmlClassName = disabled ? "popup-visible" : "";

    // Defines wether to display alert and what message to display
    const{display,message,variant} = useSelector(state => state.Alerts)
    
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.Auth.loggedIn)

    const [person,setPerson] = useState({})

    const { id } = useParams();


    const [roleData,setRoleData] = useState([
      {}
    ])

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
            // to refresh bearer token
            if (res.error) {
              console.log(res)
              PostRefreshToken(cookie.load('Refresh Token'))
              .then(res => {
                // if refresh token is invalid remove page access
                if (res.error) {
                  console.log(res)
                  setAccess(false);
                  setLoading(false);
                  dispatch(logout()) 
                  dispatch(displayAlert({ message: "Login Expired",variant: "danger"}))
                } else {
                  // store new refresh and bearer token
                  const refreshTokenPromise = cookie.save('Refresh Token', res.refreshToken.token);
                  const bearerTokenPromise = cookie.save('Bearer Token', res.bearerToken.token);
                
                  // update the cookies and reload the page
                  async function reloadPage() {
                    await refreshTokenPromise;
                    await bearerTokenPromise;
                    window.location.reload();
                  }
                
                  reloadPage();
                }
              })
            }
            if (!res.error) {
              setPerson(res)
              setRoleData(res.roles)
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