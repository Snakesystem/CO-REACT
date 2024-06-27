import React, { useEffect, useRef, useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export default function InputTypeHead(props) {
    const {tableKey, ngModel , tableName, minLength, cssClass, onChange} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const [selected, setSelected] = useState([]);

    useEffect(() => {
      setSelected(ngModel)
    }, [ngModel])

    const inputRef = useRef(null)
 
    const getOptionsSearch = async (query) => {
      setIsLoading(true);

      await fetch(`http://localhost:8111/api/generic/data/options?tablename=${tableName}&columnname=${tableKey}&columnkey=${tableKey}&querykey=${query}`)
      .then((resp) => resp.json())
      .then((result) => {
        setOptions(result);
        setIsLoading(false);
      });
    };

    function getValueByKeyFromArray(array, key) {
        for (let i = 0; i < array.length; i++) {
          const obj = array[i];
          if (obj.hasOwnProperty(key)) {
            return obj[key];
          }
        }
        return `Key "${key}" tidak ditemukan.`;
    }

    const onSelectedOption = (event) => {

        onChange(getValueByKeyFromArray(event, tableKey))
        setSelected(event)
    };

    const filterBy = () => true;

  return (
    <div className={`input-typehead ${cssClass}`}>
        <label htmlFor={tableKey} className="form-label">{tableKey}</label>
        <AsyncTypeahead
            ref={inputRef}
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey={`${tableKey}`}
            selected={selected}
            minLength={minLength}
            onChange={onSelectedOption}
            onSearch={getOptionsSearch}
            highlightOnlyResult={true}
            options={options}
            placeholder={`Input to search ${tableKey}`}
        />
    </div>
  )
}
