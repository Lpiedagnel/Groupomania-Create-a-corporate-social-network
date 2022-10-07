import React from "react"
import { useSelector } from "react-redux"
import AdminCardUser from "./AdminCardUser"
import {isEmpty} from "../Utils"

const AdminUsers = () => {
  const usersData = useSelector((state) => state.usersReducer)

  return (
    <div className="admin-users">
        <h2 className="admin_users__title">
            Liste des membres
        </h2>
        <div className="admin-users__container">
        <ul className="admin-users__list">
        {!isEmpty(usersData[0]) &&
          usersData.map((user) => {
            return (
              <AdminCardUser
                user={user}
                key={user._id}
              />
            )
          })}
      </ul>
        </div>
    </div>
  )
}

export default AdminUsers
