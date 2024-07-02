import React from 'react'
import ReactDOM from 'react-dom/client'

// import style / configure plugins
import 'react-toastify/dist/ReactToastify.css'; // style react-toastify https://fkhadra.github.io/react-toastify/introduction
import 'sweetalert2/src/sweetalert2.scss' // style sweetalert2 https://sweetalert2.github.io/
import "react-form-wizard-component/dist/style.css"; // style react-form-wizard https://react-form-wizard-component-document.netlify.app/
import 'react-bootstrap-typeahead/css/Typeahead.css'; // style react-bootstrap-typeahead https://ericgio.github.io/react-bootstrap-typeahead/
import 'swiper/css'; // style swiper https://swiperjs.com
import 'swiper/css/effect-fade'; // style swiper https://swiperjs.com
import 'aos/dist/aos.css' // style aos https://github.com/michalsnik/aos
import 'react-loading-skeleton/dist/skeleton.css' // style react-loading-skeleton https://www.npmjs.com/package/react-loading-skeleton
import 'bootstrap-icons/font/bootstrap-icons.css' // style bootstrap-icons https://icons.getbootstrap.com/
import 'bootstrap-icons/font/bootstrap-icons.min.css' // style compiler bootstrap-icons https://icons.getbootstrap.com/
import './assets/scss/style.scss'  // style custom sass

// import components
import App from './app/App'
import i18n from 'i18next'; // i18n library translateor https://www.npmjs.com/package/i18next
import { initReactI18next } from 'react-i18next'; // react-i18next https://www.npmjs.com/package/react-i18next
import lang_en from './assets/lang/locale-en.json' // import language en
import lang_id from './assets/lang/locale-id.json' // import language id
import LanguageDetector from 'i18next-browser-languagedetector'; // i18next-browser-languagedetector https://www.npmjs.com/package/i18next-browser-languagedetector
import ThemeProvider from './hooks/useTheme'; // theme provider
import { LoadingApiProvider } from './hooks/useLoadingApi'; // custom loading provider
import AuthProvider from './hooks/useAuth'; // custom auth provider

// Config i18n to translate language
i18n.use(initReactI18next).init({
  interpolation: {escapeValue: false},
  lang: "en",
  resources: {
    en: {
      lang: lang_en
    },
    id: {
      lang: lang_id
    }
  }
})

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        lang: lang_en
      },
      id: {
        lang: lang_id
      }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LoadingApiProvider>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </LoadingApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
