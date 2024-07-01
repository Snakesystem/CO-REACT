import React, { createContext, useContext, useMemo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from './useTheme';

const SweetAlertContext = createContext();

export const useSweetAlert = () => {
  return useContext(SweetAlertContext);
};

const SweetAlertProvider = ({ children }) => {
  const SweetAlert = useMemo(() => withReactContent(Swal), []);
  const { isDark } = useTheme();

  const showAlert = (options, size = 'md', backgroundStyle="default-popup-background", backdropStyle="default-backdrop") => {

    return SweetAlert.fire({
        ...options,
      customClass: {
        container: `swal2-${size}`,
        popup: `swal2-${size} ${backgroundStyle}`,
        backdrop: backdropStyle,
        ...options.customClass
      },
      didOpen: (popup) => {

        const swalContainer = popup.parentNode;
        if (swalContainer && swalContainer.classList.contains('swal2-container')) {
          swalContainer.id = isDark ? 'dark' : 'light' ;
          swalContainer.classList.add(backdropStyle);
        }
      },
    });
  };

  const closeAlert = () => {
    SweetAlert.close();
  };

  return (
    <SweetAlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
    </SweetAlertContext.Provider>
  );
};

export default SweetAlertProvider;
