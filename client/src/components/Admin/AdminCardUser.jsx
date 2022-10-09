import React from "react"
import { useSelector } from "react-redux"
import DeleteUser from "./DeleteUser"

const AdminCardUser = ({ user }) => {
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
      <DeleteUser 
      id={user._id}
      isAdmin={userData.isAdmin}
      firstName={user.firstName}
      lastName={user.lastName}
      />
    </li>
  )
}

export default AdminCardUser
