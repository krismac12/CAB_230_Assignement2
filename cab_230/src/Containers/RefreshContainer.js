import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies'
import { PostRefreshToken } from '../API-Calls/UserCalls';
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../redux/AuthReducer";
import { display  as displayAlert} from '../redux/AlertsReducer';


/*
Function to obtain new Bearer token every 5 minutes
*/
export default function RefreshTokenContainer(){
    const dispatch = useDispatch()

    const loggedIn = useSelector(state => state.Auth.loggedIn)
    useEffect(() =>{
        const interval = setInterval(() =>{
            PostRefreshToken(cookie.load('Refresh Token'))
            .then(res =>{
                console.log(res)
                if(!res.error){
                    cookie.save('Refresh Token', res.refreshToken.token)
                    cookie.save('Bearer Token', res.bearerToken.token)
                }
                else{
                    cookie.remove('Bearer Token')
                    cookie.remove('Refresh Token')
                    if(loggedIn){
                        dispatch(displayAlert({ message: "Login Expired",variant: "danger"}))
                        dispatch(logout())
                    }
                }
            })
        }, 5 * 60 * 1000)
        
        return () => clearInterval(interval);
    },[])
}