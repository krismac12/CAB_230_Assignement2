import { configureStore } from "@reduxjs/toolkit";
import NavbarSlice from "./NavbarReducer";

export default configureStore({
    reducer: {Navbar: NavbarSlice}
});