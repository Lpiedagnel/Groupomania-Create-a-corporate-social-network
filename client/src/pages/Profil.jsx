import React from "react"
import Log from "../components/Log"
import { UidContext } from "../components/AppContext"
import { useContext } from "react"
import UpdateProfil from "../components/Profil/UpdateProfil"

const Profil = () => {
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
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
