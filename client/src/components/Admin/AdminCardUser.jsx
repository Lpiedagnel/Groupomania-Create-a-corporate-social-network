import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { isEmpty } from "../Utils"

const AdminCardUser = ({ user }) => {
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)

  return (
    <li
      className="admin-card-user"
      key={user._id}
    >
      <img
        src={user.picture}
        alt="Profil pic"
        className="admin-card-user__avatar"
      />
      <div className="admin-card-user__info">
        <p className="admin-card-user__text">Nom : {user.lastName}</p>
        <p className="admin-card-user__text">Prénom : {user.firstName}</p>
        <p className="admin-card-user__text">
          Email :{" "}
          <a
            className="admin-card-user__mailto"
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        </p>
      </div>
      <i class="admin-card-user__delete fas fa-trash"></i>
    </li>
  )
}

export default AdminCardUser
