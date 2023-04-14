// Imports
import { createSlice } from "@reduxjs/toolkit";
/*
Reducer file to handle displaying and hiding alerts
*/
export const AlertsSlice = createSlice({
    name: "Alerts",
    initialState:{
        display: false,
        message: ""
    },

    reducers:{
        // Displays alert and sets the message of alert
        display: (state,action) =>{
            state.message = action.payload.message;
            state.display = true
        },

        // Hides alert by setting display as false
        hide: (state) =>{
            state.message = ""
            state.display = false
        }
    }


})

export const {display,hide} = AlertsSlice.actions

export default AlertsSlice.reducer

