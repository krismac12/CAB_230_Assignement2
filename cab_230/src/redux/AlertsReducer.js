// Imports
import { createSlice } from "@reduxjs/toolkit";

export const AlertsSlice = createSlice({
    name: "Alerts",
    initialState:{
        display: false,
        message: ""
    },

    reducers:{

        display: (state,action) =>{
            state.message = action.message
            state.display = true
        },

        hide: (state) =>{
            state.message = ""
            state.display = false
        }
    }


})

export const {display,hide} = AlertsSlice.actions

export default AlertsSlice.reducer

