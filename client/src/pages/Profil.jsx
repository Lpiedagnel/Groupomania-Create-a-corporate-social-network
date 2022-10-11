import React from "react"
import Log from "../components/Log"
import { UidContext } from "../components/AppContext"
import { useContext } from "react"
import UpdateProfil from "../components/Profil/UpdateProfil"
import LeftNav from "../components/LeftNav"

const Profil = () => {
  const uid = useContext(UidContext)

  return (
    <div className="main-container">
      <LeftNav />
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="profil__log">
          <Log
            signin={false}
            signup={true}
          />
        </div>
      )}
    </div>
  )
}

export default Profil
