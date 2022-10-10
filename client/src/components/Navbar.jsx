import React from "react"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { UidContext } from "./AppContext"
import Logout from "./Log/Logout"
import logo from "../images/icon-left-font-monochrome-white.png"
import logoResponsive from "../images/only-logo-groupomania.png"

const Navbar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <NavLink to="/">
            <div className="navbar__logo-container">
              <img
                src={logo}
                alt="Groupomania"
                className="navbar__logo-img navbar__logo-img--desktop"
              />
              <img
                src={logoResponsive}
                alt="Groupomania"
                className="navbar__logo-img navbar__logo-img--responsive"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul className="navbar__list">
            <li className="navbar__item navbar__item--desktop">
              <NavLink
                className="navbar__link "
                to="/profil"
              >
                Bienvenue {userData.firstName}
              </NavLink>
            </li>
            <li className="navbar__item navbar__item--responsive">
              <NavLink
                className="navbar__link"
                to="/profil"
              >
                <i class="fas fa-user"></i>
              </NavLink>
            </li>
            {userData.isAdmin ? (
              <li className="navbar__item navbar__item--responsive">
                <NavLink
                  className="navbar__link"
                  to="/admin"
                >
                  <i class="fas fa-tools"></i>
                </NavLink>
              </li>
            ) : null}
            <Logout />
          </ul>
        ) : (
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink
                className="navbar__link navbar__link--desktop"
                to="/profil"
              >
                Se connecter
              </NavLink>
              <NavLink
                className="navbar__link navbar__link--responsive"
                to="/profil"
              >
                <i class="fas fa-sign-in-alt"></i>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
