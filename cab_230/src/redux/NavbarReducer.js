// Imports
import { createSlice } from "@reduxjs/toolkit";

/*
Responsible for managing the different Navbar states such as disabled buttons, 
popups and Navbar button colours
*/
export const NavbarSlice = createSlice({
    name: "Navbar",
    // Defines the initial states
    initialState:{
        homeDisabled: false,
        homeColor:"text-light",
        moviesDisabled: false,
        moviesColor:"text-light",
        register: false,
        login: false,
        disabled: false
    },
    reducers:{

        // This action is triggered when the "Home" button is clicked
        homeClicked: (state) =>{
            state.homeDisabled = true
            state.homeColor = "text-info"
            state.moviesDisabled = false
            state.moviesColor = "text-light"
        },

        // This action is triggered when the "Movies" button is clicked
        movieClicked: (state) => {
            state.homeDisabled = false;
            state.homeColor = "text-light"
            state.moviesDisabled = true; 
            state.moviesColor = "text-info" 
        },
          
        // This action enables all the buttons in the Navbar
        enable: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.register = false;
            state.login = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"


        },

        // This action is triggered when the "Register" button is clicked
        enableRegister: (state) =>{
            state.register = true;
            state.homeDisabled = true;
            state.moviesDisabled = true;
            state.disabled = true;
        },

        disableRegister: (state) =>{
            state.register = false;
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
        },
        enableLogin: (state) =>{
            state.login = true;
            state.homeDisabled = true;
            state.moviesDisabled = true;
            state.disabled = true;
        },

        disableLogin: (state) =>{
            state.login = false;
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
        },

        // This action is triggered when the user navigates to a different page
        pageSwitch: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"
        }
    }
})

// Exports the Navbar states
export const {homeClicked, movieClicked, enable,enableRegister,pageSwitch,disableRegister,enableLogin,disableLogin} = NavbarSlice.actions

// Exports the reducer
export default NavbarSlice.reducer

