import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {

    const [isDark, setIsDark] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode ? JSON.parse(savedMode) : false;
      });

      useEffect(() => {
        localStorage.setItem('dark-mode', JSON.stringify(isDark));
      }, [isDark]);
    
      const switchTheme = () => {
        setIsDark(prevMode => !prevMode);
      };

    return (
        <ThemeContext.Provider value={{switchTheme, isDark}}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;