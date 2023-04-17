//imports

import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies'

/*
reducer function to keep track if the user is logged in
*/

export const AuthSlice = createSlice({

    name: "Auth",

    initialState:{
        loggedIn: false
    },

    reducers:{
        // used to login the user
        login: (state) =>{
            state.loggedIn = true
        },

        // used to logout the user
        logout: (state) =>{
            state.loggedIn = false
            cookie.remove('Bearer Token')
            cookie.remove('Refresh Token')

        }
    }
})

export const {login,logout} = AuthSlice.actions

export default AuthSlice.reducer