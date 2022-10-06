import React from "react"
import { useState } from "react"
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup)
  const [signInModal, setSignInModal] = useState(props.signin)

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false)
      setSignUpModal(true)
    } else if (e.target.id === "login") {
      setSignInModal(true)
      setSignUpModal(false)
    }
  }

  return (
    <div className="connection">
      <div className="connection__container">
        <ul className="connection__list">
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "connection__item connection__item--active" : 'connection__item'}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "connection__item connection__item--active" : 'connection__item'}
          >
            {" "}
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  )
}

export default Log
