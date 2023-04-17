import { useEffect } from "react";
import cookie from 'react-cookies'
import { useDispatch } from "react-redux";
import { login,logout } from "../redux/AuthReducer";

const AuthContainer = () =>{
    const dispatch = useDispatch()
    useEffect(() =>{
        const refreshToken = cookie.load('Refresh Token')
        if(refreshToken){
            dispatch(login())
        }
        else{
            dispatch(logout())
        }
    },[dispatch])


}

export default AuthContainer