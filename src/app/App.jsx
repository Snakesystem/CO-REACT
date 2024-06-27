import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import Aos from 'aos'
import MPCLoader, { lazyLoadComponents } from '../utils/utility'
import SweetAlertProvider, { useSweetAlert } from '../hooks/useSweetAlert'
import { useTheme } from '../hooks/useTheme' // menggunakan theme dark || light
import { useAuth } from '../hooks/useAuth' // menggunakan protected route
import { CIFProvider, useValidCif } from '../hooks/useValidCif'
import ErrorBoundary from '../components/template/slice/ErrorBoundary'
import { ToastContainer } from 'react-toastify' // container react-toastify

// Route components
const Home = lazyLoadComponents(import('./home/home'))
const Register = lazyLoadComponents(import('./auth/register'))
const ForgotPassword = lazyLoadComponents(import('./auth/forgotpassword'))
const Header = lazyLoadComponents(import('../components/layout/Header'))
const Footer = lazyLoadComponents(import('../components/layout/Footer'))
const About = lazyLoadComponents(import('./home/about'))
const Contact = lazyLoadComponents(import('./home/contact'))
const FormLayout = lazyLoadComponents(import('../components/layout/FormLayout'))
const Dashboard = lazyLoadComponents(import('./client/dashboard'))
const DataPribadi = lazyLoadComponents(import('./client/datapribadi'))
const DataBank = lazyLoadComponents(import('./client/databank'))
const DataPendukung = lazyLoadComponents(import('./client/datapendukung'))

const App = () => {

  const { isDark } = useTheme();
  
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])

  localStorage.setItem('lang', 'en');

  return (
    <main id={isDark ? 'dark': 'light'} data-bs-theme={isDark ? 'dark': 'light'}>
      <ErrorBoundary fallback="Error cuy">
        <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme={isDark ? 'dark' : 'light'} /> 
        <BrowserRouter>
          <Suspense fallback={<MPCLoader/>}>
            <SweetAlertProvider>
              <Header/>
                <CIFProvider>
                  <RouteRender/>
                </CIFProvider>
              <Footer />
            </SweetAlertProvider>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </main>

  )
}

const RouteRender = () => {

  const { pathname } = useLocation();
  const transformTitle = (route) => {
    return route
      .replace(/^\//, '') 
      .split('/') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  };

  useEffect(() => {
    document.title = `${pathname === '/' ? 'Home' : transformTitle(pathname)} - Custommer Onboarding`;
  }, [pathname])

  const routes = useRoutes(routesConfig);
  return routes;
}

const NotFound = () => {

  const { showAlert } = useSweetAlert();
  const navigate = useNavigate()

  useEffect(() => {
    showAlert({
      html: <img src='/img/404.svg' alt='404'/>,
      confirmButtonText: 'Reload',
      showDenyButton: true,
      denyButtonText: "Back to Home"
    }, 'notfound',
      'default-popup-background',
      'default-backdrop')
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        } else if (result.isDenied) {
          navigate(appRoutes.HOME)
        }
      });
  }, [showAlert, navigate])

  return null;
}

export const appRoutes = {
  HOME: '/',
  REGISTER: '/register',
  FORGOTPASSWORD: '/forgotpassword',
  CONTACT: '/contact',
  ABOUT: '/about',
  CIF: '/cif',
  DASHBOARD: '/dashboard',
  UNKNOW: '*',
}

const PrivateRoute = ({ children }) => {
  const { isAuthorized } = useAuth();

  if(!isAuthorized) {
    return <Navigate to="/" replace />
  }

  return children;
}

const ValidateDatapribadi = ({ children }) => {

  const { validData, urlPage } = useValidCif();
  
  // console.log(Object.keys(validData).length)
  // console.log(urlPage)

  return children;
}

const routesConfig = [

  // Public route
  {
    path: appRoutes.HOME,
    index: true,
    element: <Home/>,
  },
  {
    path: appRoutes.ABOUT,
    element: <About/>,
  },
  {
    path: appRoutes.CONTACT,
    element: <Contact/>,
  },
  {
    path: appRoutes.REGISTER,
    element: 
      <Register/>
  },
  {
    path: appRoutes.FORGOTPASSWORD,
    element: <ForgotPassword/>,
  },
  
  
  // protected route route
  {
    path: appRoutes.CIF,
    // element: <PrivateRoute>
    //   <CIF/>
    // </PrivateRoute>,
    element: <FormLayout/>,
    children: [
      {
        path: 'datapribadi',
        element: <ValidateDatapribadi>
          <DataPribadi/>
        </ValidateDatapribadi>
      },
      {
        path: 'databank',
        element:
          <DataBank/>
      },
      {
        path: 'datapendukung',
        element: <DataPendukung/>
      },
    ]
  },
  {
    path: appRoutes.DASHBOARD,
    element: <Dashboard/>
    // <PrivateRoute>
      
    // </PrivateRoute>,
  },
  
  // un authorized
  {
    path: appRoutes.UNKNOW,
    element: <NotFound/>,
  },
]

export default App