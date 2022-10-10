import React, { useContext, useState } from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"
import Home from "../../pages/Home"
import Profil from "../../pages/Profil"
import Admin from "../../pages/Admin"
import Navbar from "../../components/Navbar"
import { UidContext } from "../AppContext"
import { useSelector } from "react-redux"



const index = () => {

  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home />}
        />
        <Route
          path="/profil"
          exact
          element={<Profil />}
        />
        <Route
          path="/admin"
          exact
          element={
            !uid || !userData.isAdmin ? (
              <Navigate to="/" />
            ) : (
              <Admin />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default index
