import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { hide } from "../redux/AlertsReducer";
/*
Functions to manage alert states
*/

// Hides an alert after a 5 second delay
export default function useHideAlertAfterDelay(){

    const dispatch = useDispatch()
    const display = useSelector(state => state.Alerts.display)

    // useEffect hook used to set a timeout
    useEffect(() =>{
        if(display){
            // Set timeout to dispatch the hide action after 5 seconds to hide alert
            const timeout = setTimeout(() =>{
                dispatch(hide())
            }, 5000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [dispatch, display])
}

