import { createContext, useContext, useEffect, useState } from "react";

export const CifContext = createContext();

export const useValidCif = () =>  useContext(CifContext)

export const CIFProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [validData, setValidData] = useState({})
    const [urlPage, setUrlPage] = useState({})

    useEffect(() => {
        setData(localStorage.getItem("datapribadi"))
    }, [])

    return <CifContext.Provider value={{data, validData, urlPage, setValidData, setUrlPage, setData}}>
        { children }
    </CifContext.Provider>
}