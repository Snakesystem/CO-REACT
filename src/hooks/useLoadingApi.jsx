import { createContext, useContext, useState } from 'react';

const LoadingApiContext = createContext();

export const useLoadingApi = () => useContext(LoadingApiContext);

export const LoadingApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const setErrorMsg = (msg) => setError(msg);
  const clearError = () => setError(null);

  return (
    <LoadingApiContext.Provider value={
      { isLoading, error, startLoading, stopLoading, setErrorMsg, clearError }
    } >
      {children}
    </LoadingApiContext.Provider>
  );
};
