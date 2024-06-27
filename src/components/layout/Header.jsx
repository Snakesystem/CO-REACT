import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { appRoutes } from '../../app/App'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'

export const IconTheme = () => {

  const { switchTheme, isDark } = useTheme();
  
  return (
    <Link className="fs-3 navlink fw-bold cursor-pointer text-decoration-none">
      {
        isDark ? <i className="bi bi-moon-stars text-light" onClick={() => switchTheme()}></i> : 
        <i className="bi bi-brightness-high text-warning" onClick={() => switchTheme()}></i>
      }
    </Link>
  )
}

export default function Header() {

  const { t, i18n } = useTranslation();

  const changeLanguage = async (language) => {
    await window.location.reload()
    await localStorage.setItem('language', language);
    await i18n.changeLanguage(language);
  };

  return (
    <Navbar expand="lg" className="navbar-expand-lg sticky-top shadow-none">
      <Container>
        <Navbar.Brand href="/" className="d-flex gap-2 align-items-center">
          <img src='/img/favicon.ico' alt='logo' width={25} height={25}/>
          <h4 className="my-1">Custommer Onboarding</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler-icon">
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto"> 
            <NavLink className="px-5 py-2 navlink fw-bold" to={appRoutes.HOME}>Home</NavLink>
            <NavLink className="px-5 py-2 navlink fw-bold" to={appRoutes.ABOUT}>About</NavLink>
            <NavLink className="px-5 py-2 navlink fw-bold" to={appRoutes.CONTACT}>Contact</NavLink>
            <img onClick={() => changeLanguage('en')} width={28} src={`/img/en.png`} alt="en-lang"/>
            <img onClick={() => changeLanguage('id')} width={28} src={`/img/id.png`} alt="id-lang"/>

            {/* Dark mode icon start */}
            <IconTheme/>
            {/* Dark mode icon end */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
