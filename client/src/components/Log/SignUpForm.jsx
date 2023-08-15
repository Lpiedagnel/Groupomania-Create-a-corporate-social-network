import React, { useState } from "react"
import axios from "axios"
import SignInForm from "./SignInForm"

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  // const [pseudo, setPseudo] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [job, setJob] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [controlPassword, setControlPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const terms = document.getElementById("terms")
    // const pseudoError = document.querySelector('.pseudo.error')
    const firstNameError = document.querySelector(".signup__error--firstName")
    const lastNameError = document.querySelector(".signup__error--lastName")
    const jobError = document.querySelector(".signup__error--job")
    const emailError = document.querySelector(".signup__error--email")
    const passwordError = document.querySelector(".signup__error--password")
    const passwordConfirmError = document.querySelector(
      ".signup__error--password-confirm"
    )
    const termsError = document.querySelector(".signup__error--terms")

    passwordConfirmError.innerHTML = ""
    termsError.innerHTML = ""

    if (password != controlPassword || !terms.checked) {
      if (password != controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas."

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales."
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          firstName,
          lastName,
          job,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.errors) {
            firstNameError.innerHTML = res.data.errors.firstName
            lastNameError.innerHTML = res.data.errors.lastName
            jobError.innerHTML = res.data.errors.job
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="signup__success">
            Il n'est pas possible de s'inscrire sur la version de test de Groupomania. Vous pouvez utiliser le compte de test pour essayer les fonctionnalités !
          </h4>
        </>
      ) : (
        <form
          action=""
          onSubmit={handleRegister}
          id="sign-up-form"
          className="signup__form"
        >
          {/* FirstName */}
          <label
            htmlFor="firstName"
            className="signup__label"
          >
            Prénom
          </label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="signup__input"
          />
          <br />
          <div className="signup__error signup__error--firstName"></div>
          <br />

          {/* LastName */}
          <label
            className="signup__label"
            htmlFor="lastName"
          >
            Nom
          </label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="signup__input"
          />
          <br />
          <div className="signup__error signup__error--lastName"></div>
          <br />

          {/* Job */}
          <label
            className="signup__label"
            htmlFor="job"
          >
            Poste au sein de Groupomania
          </label>
          <br />
          <input
            type="text"
            name="job"
            id="job"
            onChange={(e) => setJob(e.target.value)}
            value={job}
            className="signup__input"
          />
          <br />
          <div className="signup__error signup__error--job"></div>
          <br />

          {/* Email */}
          <label
            className="signup__label"
            htmlFor="email"
          >
            Email
          </label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="signup__input"
          />
          <br />
          <div className="signup__error signup__error--email"></div>
          <br />

          {/* Password */}
          <label
            className="signup__label"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="signup__input"
          />
          <div className="signup__error signup__error--password"></div>
          <br />

          {/* Password confirmation */}
          <label
            className="signup__label"
            htmlFor="password-conf"
          >
            Confirmer le mot de passe
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
            className="signup__input"
          />
          <div className="signup__error signup__error--password-confirm"></div>
          <br />
          <input
            type="checkbox"
            id="terms"
            className="signup__checkbox"
          />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conditions générales
            </a>
          </label>
          <div className="signup__error signup__error--terms"></div>
          <br />
          <input
            type="submit"
            value="Valider inscription"
            className="signup__submit btn"
          />
        </form>
      )}
    </>
  )
}

export default SignUpForm
