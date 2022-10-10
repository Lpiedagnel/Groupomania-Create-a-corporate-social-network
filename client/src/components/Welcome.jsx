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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius
          suscipit, nisi earum quibusdam accusantium deleniti mollitia
          consectetur assumenda laboriosam ratione ullam modi delectus
          repudiandae debitis quas autem beatae aut?
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
