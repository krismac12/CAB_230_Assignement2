// Imports
import { configureStore } from "@reduxjs/toolkit";
import NavbarSlice from "./NavbarReducer";
import AlertsSlice  from "./AlertsReducer";
import AuthSlice  from "./AuthReducer";
/*
Stores the reducers of the application
*/
export default configureStore({
    reducer: {
        Navbar: NavbarSlice,
        Alerts: AlertsSlice,
        Auth: AuthSlice
    }

});