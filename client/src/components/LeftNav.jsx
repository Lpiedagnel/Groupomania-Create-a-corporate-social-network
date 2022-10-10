import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { UidContext } from "./AppContext"

const LeftNav = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <div className="leftNav">
      <div className="leftNav__container">
        <NavLink to="/">
          <i className="leftNav__icon fa-solid fa-house"></i>
          <p className="leftNav__text">Accueil</p>
        </NavLink>
        <br />
        <NavLink to="/profil">
          <i className="leftNav__icon fa-solid fa-user"></i>
          <p className="leftNav__text">Profil</p>
        </NavLink>
        {uid && userData.isAdmin ? (
          <>
            <br />
            <NavLink to="/admin">
              <i className="leftNav__icon fas fa-tools"></i>
              <p className="leftNav__text">Administration</p>
            </NavLink>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default LeftNav
