import React, { useEffect, useState } from 'react'

export default function SelectDynamic(props) {


  return (
    <div className="form-group">
        <label htmlFor="" className="form-label">Label</label>
        <select 
            id=""
            className="form-select form-control" 
            aria-label="Default select example" 
            // onClick={getOptionsSearch} required={required}
            // onChange={selectInputChange}
        >
            <option value="">Please choice...</option>
        </select>
    </div>
    
  )
}
