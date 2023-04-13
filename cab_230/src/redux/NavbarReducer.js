import { createSlice } from "@reduxjs/toolkit";


export const NavbarSlice = createSlice({
    name: "Navbar",
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
        homeClicked: (state) =>{
            state.homeDisabled = true
            state.homeColor = "text-info"
            state.moviesDisabled = false
            state.moviesColor = "text-light"
        },

        movieClicked: (state) => {
            state.homeDisabled = false;
            state.homeColor = "text-light"
            state.moviesDisabled = true; 
            state.moviesColor = "text-info" 
        },
          

        enable: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.register = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"


        },

        enableRegister: (state) =>{
            state.register = true;
            state.homeDisabled = true;
            state.moviesDisabled = true;
            state.disabled = true;
        },

        pageSwitch: (state) =>{
            state.homeDisabled = false;
            state.moviesDisabled = false;
            state.disabled = false;
            state.moviesColor = "text-light"
            state.homeColor = "text-light"
        }
    }
})

export const {homeClicked, movieClicked, enable,enableRegister,pageSwitch} = NavbarSlice.actions

export default NavbarSlice.reducer

