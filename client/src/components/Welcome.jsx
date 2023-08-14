import React from "react"
import logo from "../images/groupomania-logo-red.png"
import Log from "../components/Log"

const Welcome = () => {
  return (
    <>
      <div className="welcome">
        <img
          src={logo}
          alt="Logo de Groupomania"
          className="welcome__brand"
        />
        <h1 className="welcome__title">
          Bienvenue sur le réseau social Groupomania !
        </h1>
        <p className="welcome__resume">
          Ceci est la version de test de Groupomania ! Il n'est pas possible de créer un nouveau compte mais vous pouvez vous connecter avec le compte d'essai et tester les différentes fonctionnalités proposées. ;)
        </p>
      </div>
      <Log
        signin={true}
        signup={false}
      />
    </>
  )
}

export default Welcome
