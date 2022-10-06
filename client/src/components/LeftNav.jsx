import React from "react"
import { NavLink } from "react-router-dom"

const LeftNav = () => {
  return (
    <div className="leftNav">
      <div className="leftNav__container">
        <NavLink to="/">
          <i className="leftNav__icon fa-solid fa-house"></i>
          <p className="leftNav__text">Accueil</p>
        </NavLink>
        <br />
        <NavLink to="/trending">
          <i className="leftNav__icon fa-solid fa-rocket"></i>
          <p className="leftNav__text">Tendances</p>
        </NavLink>
        <br />
        <NavLink to="/profil">
          <i className="leftNav__icon fa-solid fa-user"></i>
          <p className="leftNav__text">Profil</p>
        </NavLink>
      </div>
    </div>
  )
}

export default LeftNav
