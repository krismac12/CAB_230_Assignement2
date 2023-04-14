// Imports
import React from 'react'
/*
This components is responsible for any popup components
the component only renders the popup if the trigger is set to true
*/

function Popup(props) {
  {/* returns the props.children if trigger is true */}
  return (props.trigger) ? (
    <div className='popup'>
        { props.children }
    </div>
  ) : "";
}

export default Popup