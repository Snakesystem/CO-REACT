import React, { useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function CobaType() {

    const [singleSelections, setSingleSelections] = useState(["Opsi 1"]);

    const options = ["Opsi 1", "Opsi 2", "Opsi 3", "Opsi 4"];

    console.log(singleSelections)

  return (
    <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          onChange={setSingleSelections}
          defaultSelected={singleSelections}
          options={options}
          placeholder="Choose a state..."
          selected={singleSelections}
        />
  )
}
