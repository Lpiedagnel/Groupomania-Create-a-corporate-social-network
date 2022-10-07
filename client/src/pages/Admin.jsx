import React, { useContext } from "react"
import { useSelector } from "react-redux"
import AdminPosts from "../components/Admin/AdminPosts"
import AdminUsers from "../components/Admin/AdminUsers"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import { redirect } from "react-router-dom"
import { Route } from "react-router-dom"

const Admin = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <div className="main-container">
        <LeftNav />
      <div className="admin">
        { 
            uid && userData.isAdmin ? (
                <>
                    <div className="admin__header">
                        <h1 className="admin__title">
                            Panneau d'administration
                        </h1>
                        <p className="admin__text">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis enim quasi neque expedita necessitatibus officiis qui consectetur repellendus ipsum, doloremque voluptate vitae reprehenderit maxime unde commodi nulla? Corporis, doloribus ab.
                        </p>
                    </div>
                    <div className="admin__main">
                        <AdminUsers />
                        <AdminPosts></AdminPosts>
                    </div>
                </>
            ) : null
        }
        </div>
    </div>
  )
}

export default Admin
