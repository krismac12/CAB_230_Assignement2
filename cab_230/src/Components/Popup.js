import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        { props.children }
    </div>
  ) : "";
}

export default Popup