import React from 'react'

import "./ListItem.css"

export default function ListItem(props) {
  return (
    <div className="px-3 py-2 shadow-sm m-1 mt-0 rounded border position-relative">
        <a onClick={() => props.removeProduct(props.index)} className="text-danger position-absolute close-btn" style={{right: "4px", top: "-6px"}}>x</a>
        {props.name}
    </div>
  )
}
