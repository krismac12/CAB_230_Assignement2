// Imports
import { configureStore } from "@reduxjs/toolkit";
import NavbarSlice from "./NavbarReducer";
/*
Stores the reducers of the application
*/
export default configureStore({
    reducer: {Navbar: NavbarSlice}
});