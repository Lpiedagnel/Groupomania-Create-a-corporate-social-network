import React from "react"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { UidContext } from "./AppContext"
import Logout from "./Log/Logout"
import logo from "../images/icon-left-font-monochrome-white.png"

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
                className="navbar__logo-img"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink to="/profil">Bienvenue {userData.firstName}</NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink to="/profil">Se connecter</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
