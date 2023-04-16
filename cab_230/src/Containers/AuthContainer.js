import { useEffect } from "react";
import cookie from 'react-cookies'
import { useDispatch } from "react-redux";
import { login,logout } from "../redux/AuthReducer";
import { PostRefreshToken } from "../API-Calls/UserCalls";

const AuthContainer = () =>{
    const dispatch = useDispatch()
    useEffect(() =>{
        console.log("Running AuthContainer");
        const refreshToken = cookie.load('Refresh Token')
        if(refreshToken){
            dispatch(login())
        }
        else{
            dispatch(logout())
        }
    },[])


}

export default AuthContainer